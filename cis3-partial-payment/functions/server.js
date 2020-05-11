'use strict';
const express = require('express');
require('dotenv').config();
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

app.use(express.json());

// console.log(process.env.PORT_EXPRESS_LAMBDA);

if (process.env.ENVIRONMENT === 'development') {
  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

// connecting to mongodb via mongoose
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// intercepting request, response before sending to the client

const Log = require('./routes/Log');

app.use((req, res, next) => {
  let oldSchool = res.send;
  let ip = req.headers['x-forwarded-for'];
  let user;

  console.log(req.originalUrl);
  // This will run right before sending response so manupulate as needed like sensitive data field
  res.send = async function (data) {
    let log = new Log({
      level: 'reqResInfo',
      IP: ip,
      method: req.method,
      route: req.originalUrl,
      req: JSON.stringify(req.body),
      res: data,
      // expire_from_now: Date.now() // Set time at schema/Index
      // expire_date: new Date('2020-04-16T14:30:46.815+00:00')
    });
    console.log(log);
    await log.save();

    oldSchool.apply(res, arguments);
  };
  next();
});

// Express Routes
app.use('/.netlify/functions/server', require('./routes/routes')); // path must route to lambda

app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
