var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  res.send('Users!');
});

app.get('/categories', function (req, res) {
  res.send('Categories');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});