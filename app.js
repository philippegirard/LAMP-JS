// Imports
const express = require('express');
var path = require('path');
require('dotenv').config();

// Config
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});