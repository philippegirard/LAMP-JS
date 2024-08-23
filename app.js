// Imports
const express = require('express');
var path = require('path');
require('dotenv').config();
const fs = require('fs');

// Config
const app = express();
app.set('view engine', 'ejs');

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/debug', (req, res) => {
    res.send('Hello World!');
});

app.get('/*', async (req, res, next) => {
    const requestedPath = req.path.slice(1); // Remove leading slash
    let viewPath = path.join(__dirname, 'views', requestedPath);

    console.log(`Requested path: /${requestedPath}`);

    // Case 1: The requested path directly matches an .ejs file
    if (requestedPath.endsWith('.ejs')) {
        if (!fs.existsSync(viewPath)) {
            return next();
        }

        console.log(`Found: /${requestedPath}`);
        return res.render(requestedPath.replace('.ejs', ''));
    }

    // Case 2: The requested path is a directory, so look for index.ejs
    if (fs.existsSync(viewPath) && fs.statSync(viewPath).isDirectory()) {
        viewPath = path.join(viewPath, 'index');
        if (fs.existsSync(`${viewPath}.ejs`)) {
            console.log(`Found: ${requestedPath}/index.ejs`);
            return res.render(viewPath.replace(`${__dirname}/views/`, ''));
        }
    }


    // If no matching .ejs file is found, pass to next middleware (or 404 handler)
    next();
});

app.use((req, res) => {
    const requestedPath = req.path.slice(1); // Remove leading slash
    console.log(`404: ${requestedPath} not found`);
    res.status(404).send('Page not found');
});

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});