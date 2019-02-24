const http = require('http');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const port = 1985;
const db = new sqlite3.Database('./server005.db');

// const existUsers = db.run(`SELECT name FROM sqlite_master WHERE type='table' AND name='users';`)
// console.log(existUsers);
db.run(`CREATE TABLE IF NOT EXISTS  users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	email VARCHAR(64) NOT NULL,
	password VARCHAR(32) NOT NULL 
	);`);


const handlerMIME = (mime, res, fileName) => {
	console.log(fileName, mime);
	const stream = fs.createReadStream(__dirname + `/public${fileName === '/'? '/index.html': fileName}`);
	stream.on('error', err => console.log(err));
	res.writeHead(200, {'Content-type' : `text/${mime}; charset=utf-8`})
	// res.end();
	stream.pipe(res);
}

const handlerMethods = {

	POST : (req, res) => {
		let body = '';
		req.setEncoding('utf-8');
		req.on('data', data => body += data);
		console.log(body);
		req.on('end', () => {
			let email = body.split('&')[0].split('=')[1];
			let password = body.split('&')[1].split('=')[1];
			console.log(email);
			db.run(`INSERT INTO users(email, password) VALUES('${email}', '${password}');`);
			db.each(`SELECT * FROM users;`, (err, data) => err? console.log(err): console.log(data));

		});
	},

	GET : (req, res) => {
		let mime = req.url.split('.')[1] || 'html';
		console.log(mime)
		handlerMIME(mime, res, req.url);
	}
};

const handler = (req, res) => {
	handlerMethods[`${req.method}`](req, res);
}


const server004 = http.createServer(handler).listen(port, err => !err ? console.log(`Server run on port ${port}`) : console.log(err));