var request = require("request");
var async = require('async');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
var username = 'st2admin';
var password = 'Xome@1234';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

app.post('/api/get', function(req, res) {
    var args = req.body;

console.log(args);
    
    async.parallel([
		function(callback) {
			var options = {
				method: 'POST',
				url: 'https://54.255.245.156/api/v1/webhooks/test',
				headers: {
					'cache-control': 'no-cache',
					'content-type': 'application/json',
					'X-Auth-Token' : 'fb38eae9b5d24eacaaac4102c1e826fa'			
	},
				body: args,
				json: true
			};

			request(options, function (error, response, body) {
				if (error) { console.log(error); callback(true); return; }
        		callback(false, body);
				//console.log(body);
			});
		}
	],
	function(err, results) {
		
//console.log(results);
});
	res.send("success");
});
