var express = require('express');
var exec = require('child_process').exec;
var app = express();

app.get('/ping', function(req, res) {
	var host = req.query.host; // SOURCE: which is untrusted user input
	exec('ping -c 1 ' + host, function(err, stdout) { 
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/echo', function(req, res) {
	exec('echo ' + req.query.host, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/chain', function(req, res) {
	var host = req.query.host;
	var prefix = 'ping -c 1 ';
	var cmd = prefix + host;
	var cmd2 = cmd + '2>&1'; // test two levels of binary op propagation

	exec(cmd2, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/trim', function(req, res) {
	var host = req.query.teststr;
	var trimmed = host.trim();
 	exec('ping -c 1 ' + trimmed, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});	
});

app.get('/replace', function(req, res) {
	var host = req.query.host;
	var replaced = host.replace('bad', 'good');
	exec('ping -c 1 ' + replaced, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/concat', function(req, res) {
	var cmd = 'ping -c 1 '.concat(req.query.host);
	exec(cmd, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/slice', function(req, res) {
	var host = req.query.host;
	var sliced = host.slice(0, 20);

	exec('ping -c 1' + sliced, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});


app.listen(3000);
// ping('google.com; cat /etc/passwd');
