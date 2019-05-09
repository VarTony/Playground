const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const requestsToDatabase = require('./requestsToDatabase');
const helpers = require('./helpers');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const sqlite3 = require('sqlite3').verbose();
let db, cookie, newUser ;
const port = 1971;
let offset = 0;
let timeDbChanged = false;

//---------------------Midleware handler----------------------

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser('cookie'));
app.use(session({cookie: { maxAge: 1800}}));
app.use(flash());


//------------------------------------------------------------

//--------------Helpers---------------------------------------


const checkExistDb = cookie => {
	let dbList = fs.readdirSync(path.join(__dirname, 'db/copiesDb'));
	cookie = cookie.length > 25? cookie.split(';')[0] : cookie;
	let nameDb = dbList.filter(nameDb => nameDb.split('|')[0] === cookie.split('=')[1]);
	let timeDb = '';
	if(timeDbChanged && nameDb.length === 1) {
		timeDbChanged = false;
		timeDb = nameDb[0].split('|')[1].split('.')[0];
		db = new sqlite3.Database(`./db/copiesDb/${cookie.split('=')[1]}|${timeDb}.db`);
	}

	return nameDb.length >= 1;
}


const rmdirRecursiveSync = dirPath => {

	let filesList = fs.readdirSync(path.join(__dirname, dirPath));
	filesList.map(fileName =>  fs.unlinkSync(path.join(__dirname, `${dirPath}/${fileName}`)));
	fs.rmdirSync(path.join(__dirname, dirPath));	
}


const dbControler = () =>{
	
	fs.readdir(path.join(__dirname, '/db/copiesDb'), (err, data) => {
		if(err){
			console.error(err)
			return;
		}

		data.map(db => {
			db = db.split('|');
			let id = db[0];
			let time = +(db[1].split('.')[0]);
			time = time - 5;
			if(time <= 0) {
				fs.unlink(path.join(__dirname, `/db/copiesDb/${db[0]+'|'+db[1]}`), 
					err =>{
						if(err){
							console.error(err);
							return;

						}
						rmdirRecursiveSync(`/view/sessionsImg/${id}`) //`/view/sessionsImg/${id}`
						console.log(`Files destroyed : ${id}`);

					});
				return;
			}

			console.log(id);
			fs.rename(path.join(__dirname, `/db/copiesDb/${db[0]+'|'+db[1]}`), path.join(__dirname, `/db/copiesDb/${id}|${time}.db`), err =>
				err? console.error(err): console.log('success'));
			timeDbChanged = true;

		});
	});
}


setInterval(dbControler, (60000 * 5)); //

//-------------------------------------------------------------




app.get('/', (req, res) => {
	cookie = req.headers.cookie;
	console.log(
	 `cookie: ${cookie}\n`,
	 `method: ${req.method}\n`,
	 `protocol: ${req.protocol}\n`,
	 `accepts: ${req.accepts(['text/html', 'image/png', 'application/javascript', 'text/javascript', 'text/css'])}\n`,
	 `ip : ${req.ip}`
	);

	console.log(cookie === undefined, 'cookie === undefined')
	if(cookie === undefined){
		// console.log('\nno exist\n');
		newUser = `id${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
		res.setHeader('Set-Cookie', `cookie=user:${newUser}`, {maxAge:  new Date(Date.now() + 1800)});  //
		cookie = `user:${newUser}`

	////////////////////

		fs.copyFile(path.join(__dirname, '/db/server004.db'), path.join(__dirname, `/db/copiesDb/${cookie}|30.db`), err => {
			
			if(err) {
				console.error(err);
				return;
			}

			fs.mkdirSync(path.join(__dirname, `/view/sessionsImg/${cookie}`));
			db = new sqlite3.Database(`./db/copiesDb/${cookie}|30.db`);
			res.set('Cache-Control', 'no-cache');
			res.sendFile(path.join(__dirname, '/view/server004.html'));
			return;
		})	
	}	

	else{
		cookie = req.headers.cookie;
		fs.readdir(path.join(__dirname, '/db/copiesDb'), (err, data) => {
		
			if(err){
				console.error(err)
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
				console.log(cookie, 'cookie else');
				res.clearCookie('cookie');
				res.clearCookie('connect.sid');
				res.redirect('/');
				return;
		}

		})

	}

	////////////////////////////////

});


app.get('/readContacts/:pageContacts', (req, res) => {
	let pageContacts = req.params.pageContacts;
	cookie = req.headers.cookie;
	if(checkExistDb(cookie))requestsToDatabase.selectAll(req, res, db, pageContacts);
	else res.redirect('/');
});

app.get('/UpdateContact/:id', (req, res) => {
	let id = req.params.id;
	cookie = req.headers.cookie;
	if(checkExistDb(cookie)) requestsToDatabase.selectContactForUpdate(req, res, db, id);	
	else res.redirect('/');
});


app.post('/CreateContact', (req, res) => {
	cookie = req.headers.cookie;
	if(checkExistDb(cookie)) requestsToDatabase.createContact(res, req, db, cookie);
	else res.redirect('/');

});


app.put('/UpdateContact/:id', (req, res) => {
	let id = req.params.id;
	cookie = req.headers.cookie;
	if(checkExistDb(cookie)) requestsToDatabase.updateContact(res, req, db, cookie, id);
	else res.redirect('/');
});



app.delete('/DeleteContact/:id', (req, res) => {
	let id = req.params.id;

	db.run(`DELETE FROM contacts WHERE id=(?);`, id, err => err 
		? res.send(err)
		: res.send(`Contact deleted - (id:${id}).`)
	);
});


app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));
