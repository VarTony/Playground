const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const requestsToDatabase = require('./requestsToDatabase');
const helpersForRootPath = require('./helpers/helpersForRootPath.js');
const helpersForControlUserTime = require('./helpers/helpersForControlUserTime');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const sqlite3 = require('sqlite3').verbose();
let db, cookie, newUser;
const port = 1971;
let offset = 0;


//---------------------Midleware handler----------------------

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser('cookie'));

//------------------------------------------------------------


setInterval(helpersForControlUserTime.dbControler, (60000 * 5)); 

app.get('/', (req, res) => {
	cookie = req.headers.cookie;
	helpersForRootPath.writeLogs(req);

	if(cookie === undefined){
	cookie = helpersForRootPath.createNewUserName(req, res);
	db = helpersForRootPath.createNewDataBase(req, res, db, cookie, sqlite3);
	}

	else {
		cookie = req.headers.cookie;
		fs.readdir(path.join(__dirname, '/db/copiesDb'), (err, data) => {
			if(err){
				console.error(err);
				return;
		}
			let thisIsTime = data.filter(db => db.split('|')[0] === cookie.split('=')[1])[0];

			if(thisIsTime !== undefined) {
				thisIsTime = thisIsTime.split('|')[1].split('.')[0];
				db = new sqlite3.Database(`./db/copiesDb/${cookie.split('=')[1]}|${thisIsTime}.db`); //user:id28a312|30.db
				res.set('Cache-Control', 'no-cache');
				res.sendFile(path.join(__dirname, '/view/server004.html'));
				return;
			}

			else {
				res.clearCookie('cookie');
				res.clearCookie('connect.sid');
				res.redirect('/');
				return;
			}
		});
	}
});


app.get('/readContacts/:pageContacts', (req, res) => {
	let pageContacts = req.params.pageContacts;
	cookie = req.headers.cookie;
	let dbExistData = helpersForControlUserTime.checkExistDb(cookie);
	if(dbExistData.exist) {
		 db = helpersForControlUserTime.connectToDatabase(cookie, dbExistData.nameDb, sqlite3);
		 requestsToDatabase.selectAll(req, res, db, pageContacts);
	 }
	else res.redirect('/');
});


app.get('/UpdateContact/:id', (req, res) => {
	let id = req.params.id;
	cookie = req.headers.cookie;
	let dbExistData = helpersForControlUserTime.checkExistDb(cookie);
	if(dbExistData.exist) {
		 db = helpersForControlUserTime.connectToDatabase(cookie, dbExistData.nameDb, sqlite3);
		 requestsToDatabase.selectContactForUpdate(req, res, db, id);
	 }
	else res.redirect('/');
});


app.post('/CreateContact', (req, res) => {
	cookie = req.headers.cookie;
	let dbExistData = helpersForControlUserTime.checkExistDb(cookie);
	if(dbExistData.exist) {
		 db = helpersForControlUserTime.connectToDatabase(cookie, dbExistData.nameDb, sqlite3);
		 requestsToDatabase.createContact(req, res, db, cookie);
	 }
	else res.redirect('/');

});


app.put('/UpdateContact/:id', (req, res) => {
	let id = req.params.id;
	cookie = req.headers.cookie;
	let dbExistData = helpersForControlUserTime.checkExistDb(cookie);
	if(dbExistData.exist) {
		 db = helpersForControlUserTime.connectToDatabase(cookie, dbExistData.nameDb, sqlite3);
		 requestsToDatabase.updateContact(req, res, db, cookie, id);
	 }
	else res.redirect('/');
});



app.delete('/DeleteContact/:id', (req, res) => {
	let id = req.params.id;
	console.log(req.headers.cookie);
	let dbExistData = helpersForControlUserTime.checkExistDb(cookie);
	if(dbExistData.exist) {
		 db = helpersForControlUserTime.connectToDatabase(cookie, dbExistData.nameDb, sqlite3);
		 requestsToDatabase.deleteContact(req, res, db, cookie, id);
	 }
	else res.redirect('/');
});


app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));
