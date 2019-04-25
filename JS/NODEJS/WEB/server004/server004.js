const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const requestsToDatabase = require('./requestsToDatabase');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/server004.db');
const port = 1971;

let offset = 0;
let superUser = `id-${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;


//---------------------Midleware handler----------------------

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 50000 }}));
app.use(flash());


//------------------------------------------------------------


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/view/server004.html'));
});


app.put('/updateOffset', (req, res) => {
	offset = req.body.nextPage ? offset + 1: offset - 1;
	res.redirect('/readContacts');
});


app.get('/readContacts', (req, res) => {
	requestsToDatabase.selectAll(req, res, db, offset);
});



app.post('/CreateContact', (req, res) => {

	let form = req.body.form; 
	let img = req.body.img;
	let imgpath = '';
	let email = form.email;
	let number_phone = form.numberPhone

	// requestsToDatabase.deleteAll(db, superUser);  

	const validator = () => {
		new Promise((res, rej) =>
			db.get(`SELECT * FROM contacts WHERE email=? OR number_phone=?`, [form.email, form.numberPhone], (err, data) => {						
				data === undefined? rej(err): res(data) // rewrite on 'err? rej(err): res(data)' after update database
		})).then(data =>  {	
			// console.log(data);	
			req.flash('Cantact_already_exist', `Contact with email: ${form.email} or phone number: ${form.numberPhone} already exist`)
			console.log(req.flash('Cantact_already_exist'))
			res.send(JSON.stringify(req.flash('Cantact_already_exist')))

		}).catch(() =>  {

			fs.writeFile(path.join(__dirname, `./view/imgs/${form.name + form.lastname}.png`), img, {encoding : 'base64'}, err => {
				if(err){
		 			console.log(err);
					return;
				}
				imgpath =  `./imgs/${form.name + form.lastname}.png`;	
				db.run(`INSERT INTO contacts(name, lastname, number_phone, email, img) VALUES('${form.name}', '${form.lastname}', '${form.numberPhone}', '${form.email}', '${imgpath}');`);
				res.redirect('/readContacts');
			})

		})
	}

	validator();

});

app.get('/UpdateContact/:id', (req, res) => {
	console.log(req.params.id);
	let id = req.params.id;
	requestsToDatabase.selectContactForUpdate(req, res, db, id);	
});


app.put('/UpdateContact', (req, res) => {});



app.delete('/DeleteContact', (req, res) => {

	db.run(`DELETE FROM contacts WHERE name!=(?);`, '', err => err 
		? console.log(err) 
		: console.log('successful'));

});



app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));