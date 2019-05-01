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
let db, cookie, newUser ;
const port = 1971;
let offset = 0;


//---------------------Midleware handler----------------------

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 1800}}));
app.use(flash());


//------------------------------------------------------------

//--------------Helpers---------------------------------------


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
			// console.log(id, time);

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
		console.log('\nno exist\n');
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
		console.log(cookie, 'cookie \n');
		
		let thisIsTime = data.filter(db => db.split('|')[0] === cookie.split('=')[1])[0];
		
		
		if(thisIsTime !== undefined) {
			console.log(thisIsTime, 'thisIsTime !== undefined');
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
			// res.send('Cookie deleted');
			res.redirect('/');
			return;
		}

		// thisIsTime =  thisIsTime !== undefined? thisIsTime.split('|')[1].split('.')[0]:null;
		// console.log(thisIsTime)
		

		})

	}

	////////////////////////////////

});




app.get('/readContacts', (req, res) => {
	requestsToDatabase.selectAll(req, res, db, offset);
});

app.get('/UpdateContact/:id', (req, res) => {
	// console.log(req.params.id);
	let id = req.params.id;
	requestsToDatabase.selectContactForUpdate(req, res, db, id);	
});


app.post('/CreateContact', (req, res) => {
	cookie = req.headers.cookie;
	requestsToDatabase.validator(res, req, db, cookie);

});


app.put('/updateOffset', (req, res) => {
	offset = req.body.nextPage ? offset + 1: offset - 1;
	res.redirect('/readContacts');
});

app.put('/UpdateContact', (req, res) => {});



app.delete('/DeleteContact/:id', (req, res) => {
	let id = req.params.id;

	db.run(`DELETE FROM contacts WHERE id=(?);`, id, err => err 
		? console.log(err) 
		: console.log('successful'));

	res.send('Contact deleted');
	// res.redirect('/');

});



// app.delete('/CookieDelete', (req, res) => {

// });


app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));


	// let form = req.body.form; 
	// let img = req.body.img;
	// let imgpath = '';
	// let email = form.email;
	// let number_phone = form.numberPhone

	// requestsToDatabase.deleteAll(db, superUser);  

	// const validator = () => {
	// 	new Promise((res, rej) =>
	// 		db.get(`SELECT * FROM contacts WHERE email=? OR number_phone=?`, [form.email, form.numberPhone], (err, data) => {						
	// 			data === undefined? rej(err): res(data) // rewrite on 'err? rej(err): res(data)' after update database
	// 	})).then(data =>  {	
	// 		// console.log(data);	
	// 		req.flash('Cantact_already_exist', `Contact with email: ${form.email} or phone number: ${form.numberPhone} already exist`)
	// 		console.log(req.flash('Cantact_already_exist'))
	// 		res.send(JSON.stringify(req.flash('Cantact_already_exist')))

	// 	}).catch(() =>  {

	// 		fs.writeFile(path.join(__dirname, `./view/sessionsImg/${cookie.split('=')[1]}/${form.name + form.lastname}.png`), img, {encoding : 'base64'}, err => {
	// 			if(err){
	// 	 			console.log(err);
	// 				return;
	// 			}
	// 			imgpath =  `./imgs/${form.name + form.lastname}.png`;	
	// 			db.run(`INSERT INTO contacts(name, lastname, number_phone, email, img) VALUES('${form.name}', '${form.lastname}', '${form.numberPhone}', '${form.email}', '${imgpath}');`);
	// 			res.redirect('/readContacts');
	// 		})

	// 	})
	// }