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

var FCM = require('fcm').FCM;
var apikey = 'dsfasfewafawef';
var fcm = new FCM(apikey);

connection.connect(function(err){
    if(err){
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.post('/send/all', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `onedaytwoday_fcm` where `Status` <> 1', [],
        function(err,rows){
            for(var i = 0; i < rows.length; i++){
                var message = {
                    registration_id: rows[i].Token, // required
                    collapse_key: 'Collapse key',
                    'data.title': req.body.title,
                    'data.message': req.body.message
                };
                fcm.send(message, function(errState, messageId){});
            }
            res.json(message);
            console.log(rows);
        });
    console.log(query + "/FLAGLOG");
});

router.post('/sends/:id', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `onedaytwoday_fcm` where `mid`=' + req.params.id + ' and `Status` <> 1', [],
        function(err,rows){
            for(var i = 0; i < rows.length; i++){
                var message = {
                    registration_id: rows[i].Token, // required
                    collapse_key: 'Collapse key',
                    'data.title': req.body.title,
                    'data.message': req.body.message
                };
                fcm.send(message, function(err, messageId){});
            }
            res.json(message);
            console.log(rows);
        });
    console.log(query);
});

router.post('/new', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('INSERT INTO onedaytwoday_fcm (Token, mid, Status) SELECT \''+ req.body.Token
        + '\', '+ req.body.mid +', 0 FROM DUAL WHERE NOT EXISTS (SELECT * FROM onedaytwoday_fcm WHERE Token=\''+
        req.body.Token +'\'); ', [], function(err,rows){
        var query2 = connection.query('UPDATE onedaytwoday_fcm set mid=' + req.body.mid + ' where Token= \'' +
            req.body.Token + '\'', function(err, rows){
            res.json(rows);
            console.log(rows);
        });
    });
    console.log(query);
});

module.exports = router;