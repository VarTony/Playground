const http = require('http');
const fs = require('promise-fs');
const path = require('path');
const dirpath = process.argv[2];
// const ls = require('../../ls/ls.js');

let filedata = 'data of file : \n';
fs.readFile(dirpath, 'utf-8')
.then(data => filedata += data)
.catch(() => fs.readFile('./file', 'utf-8')
	.then(data => filedata += data));



const server = http.createServer((req, res) => {
	console.log(req.url);
	res.write(filedata);
	res.end('Message complete');

});


const port = 1982;

server.listen(port, () => console.log('Server working'));