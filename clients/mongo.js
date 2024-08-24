const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

// Database name
const dbName = process.env.MONGO_DB_NAME || 'lampjs';

// Internal variables
let connection;
let client;

async function open() {
    connection = new MongoClient(uri, {
        serverSelectionTimeoutMS: 1000,
    });

    // Connect to the MongoDB cluster
    console.log("connecting to mongo...");
    await connection.connect();
    console.log('Connected successfully to MongoDB');

    // Return the database connection
    client = connection.db(dbName);
    return client;
}

// Function to close the connection
async function close() {
    if (connection) {
        await connection.close();
        console.log('MongoDB connection closed');
    }
}

function getClient() {
    return client;
}

module.exports = {
    open,
    getClient,
    close,
};