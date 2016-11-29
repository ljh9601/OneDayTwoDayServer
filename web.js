var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var fcm = require('./routes/fcm');
var job = require('./routes/job');
var review = require('./routes/review');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // Do I have to use this ?

app.use(express.static(__dirname + '/public'));

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

app.listen(80);
app.listen(8001);
app.listen(443);


console.log('Running');

module.exports = app;
