const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URL;

// Create a new Pool instance
let client;

async function open() {
  client = new Pool({
    connectionString,
  });

  console.log("Connecting to PostgreSQL...");
  const conn = await client.connect();
  console.log('Connected successfully to PostgreSQL');
  conn.release();
  return client;
}

// Function to close the connection
async function close() {
  if (client) {
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

module.exports = {
  open,
  close,
  client,
};