const net = require('net');
const fs = require('fs');
const http_port = 1955; 
const path = require('path');
const readline = require('readline');
const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const jsonParser = express.json();

// console.log(readline);

// rl = readline.createInterface(process.stdin, process.stdout);
// rl.question('Input your number :', data => {});
	
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './client.html')))
	
app.post('/sendData', jsonParser, (req, res) => {
	const python_run = spawn('python', ['./python/tcp_server.py', req.body.value]);
	let open = true;

	console.log(python_run.pid)
	fs.watch('./exchange',    (filename, event) =>   {
		
		// if(filename && event === 'change') {
		fs.readFile('./exchange', 'utf-8', (err, data) => {

			if(err){
				console.error(err);
				return
			}	
			if(open) {
				open = false;
				return res.send({data});
			}
			return;
			
		})
		// }
	})
	
});

app.listen(http_port, err => !err ? console.log(`port work on ${http_port} port`) : console.error(`Error : ${err}`));




// const tcp_port = 1835;
// const client = new net.Socket();

// client.setEncoding('utf-8');
	// const data = req.body.value;
	// console.log(data);

	// client.connect(tcp_port, 'localhost', () => {
 // 		console.log('connected to server'); 
 // 		client.write(data);
 // 	});

	// console.log(process.platform);
	// console.log(process.version);

	// process.stdin.resume();
	// process.stdin.on('data', data => {
	// 	client.write(data);
	// });

	// client.on('data', answer => {
 // 		console.log('answer :', answer);
	// 	res.send({answer});
	// 	 client.destroy();
	// });

	// client.on('close', () => {
		
	// });