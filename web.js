var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var fcm = require('./routes/fcm');
var job = require('./routes/job');
var review = require('./routes/review');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/fcm', fcm);
app.use('/job', job);
app.use('/review', review);

app.use(bodyParser.urlencoded({
  extended : true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8001);

console.log('Running');

module.exports = app;
