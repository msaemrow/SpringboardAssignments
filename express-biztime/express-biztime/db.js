/** Database setup for BizTime. */
const { Client } = require('pg');
require('dotenv').config();

let dbName;

if(process.env.NODE_ENV === "test"){
    dbName = 'biztime_test';
} else{
    dbName = 'biztime'
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