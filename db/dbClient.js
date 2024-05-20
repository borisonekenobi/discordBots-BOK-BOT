const {Client} = require('pg');
require('dotenv').config();

function getClient() {
    return new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB,
        ssl: !!process.env.DATABASE_URL,
    });
}

module.exports = {
    getClient
}
