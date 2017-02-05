
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
var SSE = require('sse');
var url = require("url");
var fs = require('fs');
var graphqlHTTP = require('express-graphql');
var buildSchema  = require('graphql');
var jsonToGraphql = require("json-to-graphql");
var jsonldVis = require('../wwwroot/js/jsonld-vis')

		
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
// dir names are relative to this file 
app.use(require('stylus').middleware(path.join(__dirname, '../wwwroot')));
app.use(express.static(path.join(__dirname, '../wwwroot')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.engine('html', require('ejs').renderFile);
 
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);

app.get('/', function (req, res)
{
    res.render('index.html');
});

//Read JSONLD file
var testJsonPath = path.join(__dirname,'../data/aoiTestStep201677183729977.json');

var jsonld = JSON.parse(fs.readFileSync(testJsonPath, 'utf8'));


app.get('/Get', function (req, res) {
	//answer with Json object
	res.jsonp(jsonld);
});


var testMarkdownPath = path.join(__dirname,'../README.md');
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
        jsonld = JSON.parse(fs.readFileSync(testJsonPath, 'utf8'));
        res.write("id: " + i + "\n");
        res.write("data: " + JSON.stringify({"si": sidata, "data" : jsonld}) + "\n\n");
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

//********************System Information

var si = require('systeminformation');
var sidata = {};

setInterval(function gatherData() {
  si.getAllData(function (data) {
         sidata = data;
  }, null, null);
}, 5000);

//********************GRAPHQL TESTING

var schema = require('./schema')
var query = 'query { todos { id, title, completed } }'

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

module.exports = app;
