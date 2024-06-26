/** Database for lunchly */

const { Client } = require("pg");
require('dotenv').config();

// const db = new pg.Client("postgresql:///lunchly");
let dbName = "lunchly"

const db = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: dbName   
});


db.connect();

module.exports = db;
