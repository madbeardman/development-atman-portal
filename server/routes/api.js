// Libraries
const express = require('express');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

// Local Libraries
const { mongoose } = require('./../db/mongoose');
const { Character } = require('./../models/character');
const { User } = require('./../models/user');

// Vars
var app = express();
var router = express.Router();

// API
/**
 * ================================================
 * CHARACTERS
 * ================================================
 */
router.post('/characters', (req, res) => {
    var character = new Character({
        name: req.body.name
    });

    character.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/characters', (req, res) => {
    Character.find().then((characters) => {
        res.send({ characters });
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/characters/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Character.findById(id).then((characters) => {
        if (!characters) {
            return res.status(404).send();    
        }
        res.send({ characters });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**
 * DELETE routes ================================================
 */

router.delete('/characters/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }  
 
    Character.findByIdAndRemove(id).then((characters) => {
        if (!characters) {
            return res.status(404).send();    
        }
        res.send({ characters });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**
 * PATCH routes ================================================
 */
router.patch('/characters/:id', (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'system', 'level', 'archived']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.archived) && body.archived) {
        body.archivedAt = new Date().getTime();
    } else {
        body.archived = false;
        body.archivedAt = null;
    }
 
    Character.findByIdAndUpdate(id, {$set: body}, {new: true}).then((characters) => {
        if (!characters) {
            return res.status(404).send();    
        }
        res.send({ characters });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**
 * ================================================
 * USERS
 * ================================================
 */
router.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;