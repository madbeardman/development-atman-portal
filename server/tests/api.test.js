const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Character } = require('./../models/character');

const characters = [{
    _id: new ObjectID(),
    name: 'Gandalf'
},
{
    _id: new ObjectID(),
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

describe('GET /characters/:id', () => {
    it('Should get a single character', (done) => {
        request(app)
            .get(`/characters/${characters[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.character.name).toBe(characters[0].name);
            })
            .end(done);
    });

    it('Should return a 400 if character is not found', (done) => {

        var invalidId = new ObjectID().toHexString();

        request(app)
            .get(`/characters/${invalidId}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 400 if character is not found', (done) => {

        request(app)
            .get(`/characters/123`)
            .expect(404)
            .end(done);
    });    
});

