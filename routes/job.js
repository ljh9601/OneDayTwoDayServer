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

router.post('/new', bodyParser.urlencoded({
    extended : true
}), function(req, res){
    var data = {
        'Type' : req.body.Type,
        'title' : req.body.title,
        'category' : req.body.category,
        'PDate' : req.body.PDate,
        'PExpire' : req.body.PExpire,
        'charge' : req.body.charge
    }
    var query = connection.query('insert into `onedaytwoday_parttimejob` set ?', data, function (req, res) {
        req.json(rows);
        console.log(rows);
    });
});

module.exports = router;