// Path
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/partials');

// Libraries
const express = require('express');
const hbs = require('hbs');

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

app.set('view engine','hbs');

// and now our routes
app.use(express.static(publicPath));

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

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};