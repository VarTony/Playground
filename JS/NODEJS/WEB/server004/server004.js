const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/server004.db');
const port = 1971;


app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/', jsonParser, (req, res) => {
	res.sendFile(path.join(__dirname, '/view/server004.html'));
});

app.post('/CreateContact', (req, res) => {

	let form = req.body.form; 
	let img = req.body.img;
	let imgpath = '';

	const selectAll = () => new Promise((res, rej) => db.all(`SELECT * FROM contacts;`, (err, data) => { //each						
			err? rej(err): res(data)
		})).then(data =>  {

			db.run(`DELETE FROM contacts WHERE name!=(?);`, 'DELETEALL', err => err 
				? console.log(err) 
				: console.log('successful'));		
			
			console.log(data);
			res.send(data);
		});


	fs.writeFile(path.join(__dirname, `./view/imgs/${form.name + form.lastname}.png`), img, {encoding : 'base64'}, err => {

		if(err){
		 console.log(err);
		 return;
		}
		
		imgpath =  `./imgs/${form.name + form.lastname}.png`;	
		db.run(`INSERT INTO contacts(name, lastname, number_phone, email, img) VALUES('${form.name}', '${form.lastname}', '${form.numberPhone}', '${form.email}', '${imgpath}');`);
		selectAll();
	});

});


app.put('/UpdateContact', (req, res) => {});

app.delete('/DeleteContact', (req, res) => {

	db.run(`DELETE FROM contacts WHERE name!=(?);`, '', err => err 
		? console.log(err) 
		: console.log('successful'));

});



app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));