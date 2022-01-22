'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const configLib = require('config');
const app = express();

const config = configLib.get('configServer');

app.use(express.json());
app.use(express.urlencoded());
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(bodyParser.json());

/* app.use('/serverChung/api', eventRoutes.routes);
app.use('/serverChung/', (req, res, next) => {
  res.send('hello chay dc');
}); */

app.use('/api', eventRoutes.routes);
app.use('/', (req, res, next) => {
  res.send('hello chay dc');
});

global.SessionLogin = {};

app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port);
});
