const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const app = express();
require('dotenv').config();

let port = process.env.PORT
if (port == null || port == "") {
  port = 8000
}

mongoose.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    console.log('Connected!');
    app.listen(port);
  }
);
let db = mongoose.connection;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  db.collection('UrlShortener')
    .find()
    .toArray(function(err, result) {
      if (err) console.log(err);
      result.reverse();
      res.render('index', { shortUrls: result });
    });
});

// Creating DB
app.post('/urlShort', (req, res) => {
  //   console.log(req.body.fullUrl);

  //  Checking http in URL
  var n = req.body.fullUrl.includes('http');
  if (!n && req.body.fullUrl !== '') {
    let temp = 'http://'.concat(req.body.fullUrl);
    db.collection('UrlShortener').insertOne(
      {
        fullUrl: temp,
        short: shortId.generate(),
        clicks: 0,
        userInput: req.body.fullUrl
      },
      function(err, info) {
        if (err) {
          console.log('Something went wrong!');
        }
      }
    );
  } else {
    if (req.body.fullUrl !== '') {
      db.collection('UrlShortener').insertOne(
        {
          fullUrl: req.body.fullUrl,
          short: shortId.generate(),
          clicks: 0,
          userInput: req.body.fullUrl
        },
        function(err, info) {
          if (err) {
            console.log('Something went wrong!');
          }
          //   else { console.log(info.ops[0]);  }
        }
      );
    }
  }
  res.redirect('/');
});

// Checking the short url in the DB and redirecting
app.get('/:shortUrl', async (req, res) => {
  const getFullUrl = await db
    .collection('UrlShortener')
    .findOne({ short: req.params.shortUrl });

  // Updating clicks
  await db.collection('UrlShortener').findOneAndUpdate(
    { _id: getFullUrl._id },
    {
      $set: {
        fullUrl: getFullUrl.fullUrl,
        short: getFullUrl.short,
        clicks: getFullUrl.clicks + 1,
        userInput: getFullUrl.userInput
      }
    }
  );

  res.redirect(getFullUrl.fullUrl);
});
