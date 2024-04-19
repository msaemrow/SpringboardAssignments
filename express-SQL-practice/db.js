const { Client } = require("pg");
require('dotenv').config();

let dbName = "postgresql:///usersdb"

if (process.env.NODE_ENV === "test") {
    dbName = 'usersdb_test';
} else {
    dbName = 'usersdb';
}

const db = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: dbName
});

db.connect()
   .then(() => console.log('Database connected successfully'))
   .catch(err => console.error('Error connecting to database:', err));
module.exports = db;