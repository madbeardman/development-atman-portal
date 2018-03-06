// Path
const path = require('path');
const publicPath = path.join(__dirname, '../public');

// Libraries
const express = require('express');

const port = process.env.PORT || 3000;

// App
var app = express()

app.use(express.static(publicPath));



app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};