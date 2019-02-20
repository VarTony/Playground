const http = require('http');
const outputs = require('./outputs.js');

const response = (res, type = 'html') => {
	res.writeHead('200', {'Content-type' : `text/${type}; charset=utf-8`  });
	res.end(outputs[type]);
} 

const handler = (req, res) => {
	let url = req.url.split('.');
	console.log(url);
	response(res, url[1]||'html');
}

const server = http.createServer(handler).listen(8050, err => console.log(err));