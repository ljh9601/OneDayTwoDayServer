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

router.post('/tupdate', bodyParser.urlencoded({ // SELECTED JOB TITLE CHANGE
    extended : true
}), function(req, res){
    var data = {
        'id' : req.body.id,
        'Title' : req.body.Title
    }
    var query = connection.query('update `onedaytwoday_review` set `Title` =\'' + req.body.Title +
        '\' where `id` = ' + req.body.id, [], function (req, res) {
        req.json(rows);
        console.log(rows);
    });
});

router.post('/cupdate', bodyParser.urlencoded({ // SELECTED JOB CATEGORY CHANGE
    extended : true
}), function(req, res){
    var data = {
        'id' : req.body.id,
        'Category' : req.body.Category
    }
    var query = connection.query('update `onedaytwoday_review` set `Category` =\'' + req.body.Category +
        '\' where `id` = ' + req.body.id, [], function (req, res) {
        req.json(rows);
        console.log(rows);
    });
});

router.post('/new', bodyParser.urlencoded({ // NEW JOB INSERT
    extended : true
}), function(req, res){
    var data = {
        'Type' : req.body.Type,
        'Title' : req.body.Title,
        'Category' : req.body.Category,
        'PDate' : req.body.PDate,
        'PExpire' : req.body.PExpire,
        'Charge' : req.body.Charge
    }
    var query = connection.query('insert into `onedaytwoday_parttimejob` set ?', data, function (req, res) {
        req.json(rows);
        console.log(rows);
    });
});

module.exports = router;