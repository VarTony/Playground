const net = require('net');
const port = 1982;

const server = net.createServer(connect => {

	connect.on('data', data => {

		console.log(`${data}from ${connect.remotePort}`);
		const answer = `You : ${data}`;
		connect.write(answer);
	});

	connect.on('close', () => console.log('Client closed connection'));

}).listen(port);

console.log(`Listen on port ${port}`);
