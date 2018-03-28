// Path
const path = require('path');
const publicPath = path.join(__dirname, '../public');

// Libraries
const express = require('express');
const port = process.env.PORT || 3000;

// App
var app = express()

// Implement this from a config var
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// and now our routes

app.use(express.static(publicPath));

app.use(require('./routes/routes'));
app.use(require('./routes/api'));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };