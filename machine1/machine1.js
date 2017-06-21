
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var url = require("url");
var fs = require('fs');


var root = './wwwroot/js'; 

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './wwwroot'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// dir names are relative to this file 
app.use(require('stylus').middleware(path.join(__dirname, './wwwroot')));
app.use(express.static(path.join(__dirname, './wwwroot')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}




//var server = http2.createServer(options, app); //HTTPS SERVER
var server = http.createServer(app);	//HTTP SERVER
server.listen(app.get('port'), function () {
	    console.log('Express server listening on port ' + app.get('port'));
});


app.get('/', function (req, res)
{
    res.render('machine1.html');
});



module.exports = app;