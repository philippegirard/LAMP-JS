// Imports
const express = require('express');
var path = require('path');
require('dotenv').config();
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const mongo = require("./clients/mongo");

// Config
const app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'pages'));
app.set('layout', 'layout/main');

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));

// API
app.use('/api', express.json());
app.use('/api', (req, res, next) => {
    const apiPath = req.path.slice(1); // Remove leading slash after /api/
    const apiFilePath = path.join(__dirname, 'api', `${apiPath}.js`);

    console.log(`Requested API path: /${apiFilePath}`);

    if (!fs.existsSync(apiFilePath)) {
        console.log(`404: /api/${apiPath} not found`);
        return res.status(404).send('API endpoint not found');
    }

    const handler = require(apiFilePath);
    return handler(req, res, next);
});

// Routes
app.get('/debug', (req, res) => {
    res.send('Hello World!');
});

app.get('/*', async (req, res, next) => {
    const requestedPath = req.path.slice(1); // Remove leading slash
    let viewPath = path.join(__dirname, 'pages', requestedPath);

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
            return res.render(viewPath.replace(`${__dirname}/pages/`, ''));
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


const StartServer = async () => {
    // Open Clients
    const mongo = require('./clients/mongo');
    const postgres = require('./clients/postgres');

    await mongo.open();
    await postgres.open();

    // Start
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`);
    });


     // Handle shutdown gracefully
     const shutdown = () => {
        console.log('Starting graceful shutdown...');

        server.close(() => {
            console.log('Express server closed.');
            mongo.close();
            postgres.close();
            console.log('All clients closed.');
            process.exit(0);
        });

        // Force close after 10 seconds
        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };

    // Listen for both SIGTERM and SIGINT
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}
StartServer()