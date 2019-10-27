const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // create new express application
app.use(cors()); // cross origin resource sharing. allows us to make requests across domains
app.use(bodyParser.json()); // parse incoming requests to json values

// 