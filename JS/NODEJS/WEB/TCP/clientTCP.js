const net = require('net');
const port = '1982'; 
const client = new net.Socket();
client.setEncoding('utf-8');

client.connect(port, 'localhost', () => {
 	console.log('connected to server'); 
 	client.write('Who need in me?');
 });

console.log(process.platform);
console.log(process.version);

process.stdin.resume();
process.stdin.on('data', data => client.write(data));

client.on('data', data => console.log(data));
client.on('close', () => console.log('Connection is close'));
