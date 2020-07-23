var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var app = express();
var port = process.env.PORT || 5000;
var config = require('./config/config.json');
const { Sequelize } = require('sequelize');

var sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var User = sequelize.define('User', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });



app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  User.findAll().then(function(users) {
    res.send(users);
  });
});

app.post('/user', jsonParser, async function (req, res) {
  var user = User.build(req.body);
  await user.save();
  res.send("User insert success");
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