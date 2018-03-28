// Libraries
const express = require('express');

// Local Libraries
const { mongoose } = require('./../db/mongoose');
const { Character } = require('./../models/character');
const { User } = require('./../models/user');

// Vars
var app = express();
var router = express.Router();

// API
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
        res.send({characters});
    }, (e) => {
        res.status(400).send(e);
    });
});

module.exports = router;