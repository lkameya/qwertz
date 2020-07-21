var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8080;

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

app.get('/products', function (req, res) {
  res.send('Produtos');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});