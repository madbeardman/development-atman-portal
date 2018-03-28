// Path
const path = require('path');
const viewsPath = path.join(__dirname, '../../views/partials');

// Libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

// Vars
var app = express();
var router = express.Router();

// let's setup Handlebars
hbs.registerPartials(viewsPath);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('forceUpper', () => {
    return text.toUpperCase();
});

router.use(bodyParser.json());
app.set('view engine', 'hbs');
 
//create simple log to the screen/file
router.use((req, res, next) => {
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

// Page gets
router.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Atman Portal'
    });
});
 
router.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

router.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page'
    });
});
 
module.exports = router;