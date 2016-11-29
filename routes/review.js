// 2014112056 이동욱

var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '10.0.0.1',
    port : 3306,
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

router.get('/all', function (req, res) {
    var query = connection.query('select * from `onedaytwoday_review` where `Uid`=\' ' + req.body.Uid + '\' ', [],
        function(err, rows){
            res.json(rows);
            console.log(rows);
        });
});

router.post('/update', bodyParser.urlencoded({ // CONTENT EDIT
    extended : true
}), function(req, res){
    var data = {
        'Uid' : req.body.Uid,
        'Pid' : req.body.Pid,
        'Content' : req.body.Content
    }
    var query = connection.query('update `onedaytwoday_review` set `content` =\'' + req.body.Content +
        'where Uid = \'' + req.body.Uid + '\' and Pid = \'' + req.body.Pid + '\' ', [], function (err, rows) {
        res.json(rows);
        console.log(rows);
    });
});


router.post('/new', bodyParser.urlencoded({ // NEW REVIEW
    extended : true
}), function(req, res){
    var data = {
        'Uid' : req.body.Uid,
        'Pid' : req.body.Pid,
        'Content' : req.body.Content
    }
    var query = connection.query('insert into `onedaytwoday_review` set ?', data, function (err, rows) {
        res.json(rows);
        console.log(rows);
    });
});

module.exports = router;