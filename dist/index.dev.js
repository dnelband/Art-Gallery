"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var path = require('path');

var db = require('./server/queries');

var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](__dirname + '/build'));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app["delete"]('/users/:id', db.deleteUser);
app.get('/pictures', db.getPictures);
app.get('/pictures/:picture_type', db.getPicturesByType);
app.get('/navigation', db.getNavigation);
app.post('/messages', db.createMessage);
app.get('/messages', db.getMessages);
app.listen(process.env.PORT || 8080, function () {
  console.log('YO YO YO BIACH');
});