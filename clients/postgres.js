const { Pool } = require('pg');

// PostgreSQL connection URI
const connectionString = process.env.POSTGRES_URL;

// Internal variables
let poolConnection;
let client;

async function open() {
    poolConnection = new Pool({
        connectionString,
    });

    // Connect to the PostgreSQL cluster
    console.log("Connecting to PostgreSQL...");
    client = await poolConnection.connect();
    console.log('Connected successfully to PostgreSQL');

    return client;
}

// Function to close the connection
async function close() {
    if (poolConnection) {
        await poolConnection.end();
        console.log('PostgreSQL connection closed');
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