var http = require('http');
var app = require("./server/app.js");

server = http.createServer(app).listen(app.get('port'), function () {
	    console.log('Express server listening on port ' + app.get('port'));
});
