const  express = require('express');
const  { exec } = require('child_process');
const app = express();

function execCmd(cmd, ...callbacks) {
	const cb = callbacks[0] || function() {};
	exec(cmd, cb);
}

app.get('/ping', (req, res) => {
	const items = ['a', 'b', 'c'];
	for (const item of items) {
          console.log(item);
	}
	const { host } = req.query; // SOURCE: which is untrusted user input
	execCmd('ping -c 1 ' + host, function(err, stdout) { 
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/echo', (req, res, next = null, badecho = null) => {
	const { host } = req.query;
	if (!badecho) {
	   execCmd('echo ' + host, (err, stdout) => {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	   });
	} else {
	   res.send(`INVALID VALUE OF BADECHO: ${badecho}`);
	}
});

app.get('/chain', (req, res) => {
	const { host } = req.query;
	const prefix = 'ping -c 1 ';
	const cmd = prefix + host;
	const cmd2 = cmd + '2>&1'; // test two levels of binary op propagation

	execCmd(cmd2, (err, stdout) => {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/trim', (req, res) => {
	const { teststr } = req.query;
	const trimmed = teststr.trim();
 	execCmd('echo ' + trimmed, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});	
});

app.get('/replace', (req, res) => {
	const { host } = req.query;
	const  replaced = host.replace('bad', 'good');
	execCmd('ping -c 1 ' + replaced, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/concat', (req, res) => {
	const cmd = 'ping -c 1 '.concat(req.query.host);
	execCmd(cmd, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});

app.get('/slice', (req, res) => {
	const { host } = req.query;
	const sliced = host.slice(0, 20);

	execCmd('ping -c 1' + sliced, function(err, stdout) {
		if (err) res.send(`FAIL: [${err}]\n`);
		else res.send(`OK: [${stdout}]\n`);
	});
});


app.listen(4000);
