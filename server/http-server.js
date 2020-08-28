var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var app = express();
var port = process.env.PORT || 5000;
var config = require('./config/config.json');
const { Sequelize } = require('sequelize');
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
// Add headers

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://dry-atoll-57308.herokuapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// var sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
//   host: config.development.host,
//   dialect: 'postgres',
//   port: 5432,
// });

// var sequelize = new Sequelize('postgres://lkameya@localhost:5432/qwertz');
var sequelize = new Sequelize(process.env.DATABASE_URL);

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
    },
    pwd: {
      type: Sequelize.STRING
    }
  });


function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//authentication
app.post('/login', jsonParser, async (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  var email = req.body.email;
  var password = req.body.pwd;

  console.log('ESTOU NO LOGIN');

  const user = await User.findOne({
    where: { email: req.body.email }
  });

  console.log(user);

  bcrypt.compare(password, user.pwd, function(err, result) {
    console.log('ESTOU NO bcrypt');
    if(result){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 6000 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    return res.status(500).json({message: 'Login inválido!'});
  });  
});

app.post('/logout', function(req, res) {
  res.json({ auth: false, token: null });
});

app.get('/users', verifyJWT, function (req, res) {
  User.findAll().then(function(users) {
    res.send(users);
  });
});

app.get('/user/:id', function (req, res) {
  console.log(req.params.id);
  User.findOne({
    where: { id: req.params.id }
  }).then(function(user) {
    res.send(user);
  });
});

app.post('/user', jsonParser, async function (req, res) {

  var novoUsuario = req.body;
  var password = novoUsuario.pwd;

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    // Store hash in your password DB.
    novoUsuario.pwd = hash;
    var user = User.build(novoUsuario);
    await user.save();
  }); 

  res.send("User insert success");
});

app.put('/user/:id', jsonParser, async function (req, res) {
  User.update(
    req.body,
    {where: { id: req.params.id }
  }).then(function(user) {
    console.log(user);
  });
  res.send("User update success");
});

app.delete('/user/:id', jsonParser, async function (req, res) {
  User.destroy(
    {where: { id: req.params.id }
  }).then(function(user) {
    console.log(user);
  });
  
  res.send("User delete success");
});

app.get('/categories', function (req, res) {
  res.send('Categories');
});

app.get('/products', function (req, res) {
  res.send('Produtos');
});

module.exports = app;
