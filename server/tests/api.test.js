const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Character } = require('./../models/character');

const characters = [{
    name: 'Gandalf'
},
{
    name: 'Gimli'
}];

beforeEach((done) => {
    Character.remove({}).then(() => {
        return Character.insertMany(characters);
    }).then(() => done());
});

describe('POST /characters', () => {
    it('Should add a new character', (done) => {
        var name = 'Legolas';

        request(app)
            .post('/characters')
            .send({ name })
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(name);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Character.find({name}).then((characters) => {
                    expect(characters.length).toBe(1);
                    expect(characters[0].name).toBe(name);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should NOT create a new character', (done) => {
        request(app)
            .post('/characters')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Character.find().then((characters) => {
                    expect(characters.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});

describe('GET /characters', () => {
    it('Should get all characters', (done) => {
        request(app)
            .get('/characters')
            .expect(200)
            .expect((res) => {
                expect(res.body.characters.length).toBe(2);
            })
            .end(done);
    });
});

