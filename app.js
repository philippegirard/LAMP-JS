// Imports
const express = require('express');
var path = require('path');
require('dotenv').config();

// Config
const app = express();
app.set('view engine', 'ejs');

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/debug', (req, res) => {
    res.send('Hello World!');
});

app.get('/', async (req, res) => {
    res.render('index');
});

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});