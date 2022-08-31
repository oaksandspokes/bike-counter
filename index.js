const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const postCounter = require('./views/pages/post-counter');
const getLocation = require('./views/pages/get-count');
var cors = require('cors')
const bodyParser = require("body-parser");

var corsOptions = {
  origin: '*', // No CORS validaiton for now
}

// Connect to the DB
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors(corsOptions))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/v1/location', (req, res) => postCounter(req, res, pool))
  .get('/v1/location', (req, res) => getLocation(req, res, pool))
  .get('/v1/location/:name', (req, res) => getLocation(req, res, pool))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
