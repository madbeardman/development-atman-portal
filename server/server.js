// Path
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/partials');

// Libraries
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');

// Local Libraries
const { mongoose } = require('./db/mongoose');
const { Character } = require('./models/character');
const { User } = require('./models/user');

const port = process.env.PORT || 3000;

// App
var app = express()

// let's setup Handlebars
hbs.registerPartials(viewsPath);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('forceUpper', () => {
    return text.toUpperCase();
});

// let's configure Express
app.use(bodyParser.json());
app.set('view engine', 'hbs');

//create simple log to the screen/file
app.use((req, res, next) => {
    var currentDateTime = new Date();
    var logRecord = `${currentDateTime}: ${req.method} ${req.url}`
    var logFileName = 'logs/' + currentDateTime.getFullYear() + '_' + (currentDateTime.getMonth() + 1) + '_' + currentDateTime.getDate() + '.log';

    console.log(logRecord);

    fs.appendFile(logFileName, logRecord + '\n', (err) => {
        if (err) {
            console.log('Unable to write to the log file.');
        }
    });
    next();
});

// Implement this from a config var
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// and now our routes

app.use(express.static(publicPath));

// Page gets
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Atman Portal'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page'
    });
});

// API
app.post('/characters', (req, res) => {
    var character = new Character({
        name: req.body.name
    });

    character.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };