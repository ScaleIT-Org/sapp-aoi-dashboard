
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var http2 = require('spdy');
var path = require('path');
var bodyParser = require('body-parser');
var SSE = require('sse');
var url = require("url");
var fs = require('fs');
//var WebSocketServer = require('websocket').server;
var graphqlHTTP = require('express-graphql');
var buildSchema  = require('graphql');
var jsonToGraphql = require("json-to-graphql");
var jsonldVis = require('./wwwroot/js/jsonld-vis')

var root = './wwwroot/js';
var netjet = require('netjet');  

var app = express().use(netjet({
    cache: {
      max: 200
    }
  }));

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
var io = require('socket.io')(server);
server.listen(app.get('port'), function () {
	    console.log('Express server listening on port ' + app.get('port'));
});


app.get('/', function (req, res)
{
    res.render('machine2.html');
});
app.get('/notification', function (req, res)
{
    res.render('notification.html');
});



var jsonld = {};


app.get('/Get', function (req, res) {
	//answer with Json object
	res.jsonp(jsonld);
});


var testMarkdownPath = path.join(__dirname,'./README.md');
var readme = fs.readFileSync(testMarkdownPath, 'utf8');

app.get('/md', function (req, res) {
  //answer with Markdown object
  res.send(readme);
});

app.get('/sse', function (req, res) {
  var parsedURL = url.parse(req.url, true);
  var pathname = parsedURL.pathname + "/data";

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });

    var padding = new Array(2049);
    res.write(":" + padding.join(" ") + "\n"); // 2kB padding for IE
    res.write("retry: 2000\n");

    var lastEventId = Number(req.headers["last-event-id"]) || Number(parsedURL.query.lastEventId) || 0;

    var timeoutId = 0;
    var i = lastEventId;
    var c = i + 100;

    var f = function () {
      if (++i < c) {
        jsonld = {}
        res.write("id: " + i + "\n");
        res.write("data: " + JSON.stringify({"si": sidata, "data" : jsonld}) + "\n\n");
        timeoutId = setTimeout(f, 1000);
      } else {
        res.end();
      }
    };

    f();

    res.on("close", function () {
      clearTimeout(timeoutId);
    });

});


//********************System Information
var isWin = /^win/.test(process.platform);
if(!isWin){
	var si = require('systeminformation');
	var sidata = {};

	setInterval(function gatherData() {
	  si.currentLoad(function (data) {
	         sidata.currentLoad = data;
	  });
    si.mem(function (data) {
           sidata.mem = data;
    });
	}, 1000);
}


module.exports = app;
