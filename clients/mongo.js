const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

// Database name
const dbName = process.env.MONGO_DB_NAME || 'lampjs';

// Create a new MongoClient
let client;

async function open() {
    client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 1000,
    });

    // Connect to the MongoDB cluster
    console.log("connecting to mongo...");
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Return the database connection
    return client.db(dbName);
}

// Function to close the connection
async function close() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = {
    open,
    client,
    close,
};