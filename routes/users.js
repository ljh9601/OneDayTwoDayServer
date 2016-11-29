var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '10.0.0.1',
    port : '3306',
    user : 'kimhwamin',
    password : 'onedaytwoday12',
    database : 'kimhwamin'
});
var router = express.Router();
var bodyParser = require('body-parser');

connection.connect(function(err){
  if(err){
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});


router.post('/login', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select * FROM `onedaytwoday_user` where `Uid`=\'' + req.body.Uid + '\' AND `Pwd`=\'' +
        req.body.Pwd + '\' ', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('',function(req, res){

});

router.post('/register', bodyParser.urlencoded({
  extended : true
}), function(req, res){
  var data = {
    'Uid' : req.body.Uid,
    'Pwd' : req.body.Pwd,
    'Name' : req.body.Name,
    'BDate' : req.body.BDate,
    'Phone' : req.body.Phone
  }
  var query = connection.query('insert into `onedaytwoday_user` set ?', data, function (err, rows) {
    res.json(rows);
    console.log(rows);
  });
});

module.exports = router;
