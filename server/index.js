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

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
    // retry stratergy is telling server how often to retry conn to server if conn lost
});

// need duplicate conn. according to documentation.
const redisPublisher = redisClient.duplicate(); 

// Express Route Handlers

// test route
app.get('/', (req, res) => {
    res.send('Hi');
});

// used to query running post gres instance. return all values
app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values.rows); // only return rows, not extra information about query, eg time taken
});

// get values from redis
app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

// called when user adds value
app.post('/values', async (req, res) => {
    const index = req.body.index; // gets index from body

    // capped at 40 so server doesnt get locked down for to long
    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hset('values', index, 'Nothing yet!');
    // calc value
    redisPublisher.publish('insert', index);

    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
});


app.listen(5000, err => {
        console.log('Listening on port 5000');
});