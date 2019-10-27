const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // create new express application
app.use(cors()); // cross origin resource sharing. allows us to make requests across domains
app.use(bodyParser.json()); // parse incoming requests to json values

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG Connection'));

// initial db setup
pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)') 
    .catch((err) => console.log(err));