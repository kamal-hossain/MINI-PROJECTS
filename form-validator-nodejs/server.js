const express = require('express');
const app = express();
require('dotenv').config();

// mongodb connection
const mongodb = require('mongodb');
const url = process.env.CONNECTIONSTRING;
let db;

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    db = client.db();
    console.log('Connected');
    app.listen(3000);
  }
);

app.use(express.static(__dirname + '/')); // making the root folder public to connect css/js files
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', './'); // set the folder to lookup files for ejs
app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    extended: true
  })
); // to support URL-encoded bodies

// Rendering the home page with .ejs template
app.get('/', (req, res) => {
  db.collection('form-validator-1')
    .find()
    .toArray(function(err, items) {
      res.render('./ejs/index', { items: items });
    });
});

// Creating a user to the database
app.post('/createUser', (req, res) => {
  // TODO: Sanitize the inputs //
  db.collection('form-validator-1').insertOne(
    { username: req.body.username, email: req.body.email },
    (err, info) => {
      // console.log('Successfully Inserted');
      res.json(info.ops[0]);
    }
  );
});

// Delete Items
app.post('/delete-user', (req, res) => {
  db.collection('form-validator-1').deleteOne(
    {
      _id: new mongodb.ObjectID(req.body.id)
    },
    (err, info) => {
      if (err) console.log('Failed to delete User data!');
      res.json('Successfully Deleted!');
    }
  );
});

// A route for checking all data in the database
// app.get('/test', (req, res) => {
//   //Testing purpose
//   db.collection('form-validator-1')
//     .find()
//     .toArray(function(err, items) {
//       console.log(items);
//       console.log(JSON.stringify(items));

//       res.send(JSON.stringify(items));
//     });
// });
