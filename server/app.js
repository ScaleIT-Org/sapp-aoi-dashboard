
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
var SSE = require('sse');
var url = require("url");

		
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../wwwroot'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../wwwroot/public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
 
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

//Read JSONLD file
var fs = require('fs');
var jsonld = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/aoiTestStep201677183729977.json'), 'utf8'));


/*http.createServer(function (request, response) {
  var parsedURL = url.parse(request.url, true);
  var pathname = parsedURL.pathname + "/public";
  if (pathname === "/sse") {

    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });

    var padding = new Array(2049);
    response.write(":" + padding.join(" ") + "\n"); // 2kB padding for IE
    response.write("retry: 2000\n");

    var lastEventId = Number(request.headers["last-event-id"]) || Number(parsedURL.query.lastEventId) || 0;

    var timeoutId = 0;
    var i = lastEventId;
    var c = i + 100;
    var f = function () {
      if (++i < c) {
		jsonld = JSON.parse(fs.readFileSync('aoiTestStep201677183729977.json', 'utf8'));
        response.write("id: " + i + "\n");
        response.write("data: " + JSON.stringify(jsonld) + "\n\n");
        timeoutId = setTimeout(f, 5000);
      } else {
        response.end();
      }
    };

    f();

    response.on("close", function () {
      clearTimeout(timeoutId);
    });

  } else {
    if (pathname === "/") {
      pathname = "/index.html";
    }
    if (pathname === "/Get") {
        console.log("data");
        res.jsonp(jsonld);
    }
    if (pathname === "/index.html" || pathname === "../eventsource.js") {
      response.writeHead(200, {
        "Content-Type": pathname === "/index.html" ? "text/html" : "text/javascript"
      });
      response.write(fs.readFileSync(__dirname + pathname));
    }
    response.end();
  }
}).listen(app.get('port'));*/

app.get('/Get', function (req, res) {
	//answer with Json object
	res.jsonp(jsonld);
});

app.get('/sse', function (req, res) {
  var parsedURL = url.parse(req.url, true);
  var pathname = parsedURL.pathname + "/public";

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
    jsonld = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/aoiTestStep201677183729977.json'), 'utf8'));
        res.write("id: " + i + "\n");
        res.write("data: " + JSON.stringify(jsonld) + "\n\n");
        timeoutId = setTimeout(f, 5000);
      } else {
        res.end();
      }
    };

    f();

    res.on("close", function () {
      clearTimeout(timeoutId);
    });

});

module.exports = app;
