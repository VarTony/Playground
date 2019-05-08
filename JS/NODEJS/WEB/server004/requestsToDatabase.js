const fs = require('fs');
const path = require('path');

const selectAll = (req, res, db, offset = 1) => { 
	
	new Promise((res, rej) =>
		db.all(`SELECT * FROM contacts LIMIT 5 OFFSET ${offset};`, (err, data) => { //each						
			err? rej(err): res(data)
	})).then(data =>  {		
		res.set('Cache-Control', 'no-cache');
		return res.send(data)	
	}).catch(err => console.error(err));
}


const selectContactForUpdate = (req, res, db, id) => {
	new Promise((res, rej) =>
		db.each(`SELECT * FROM contacts WHERE id=(?);`, id, (err, data) => {
			err? rej(err): res(data)
			})).then(data =>  {		
				console.log(data);
				return res.send(data);	
			}).catch(err => console.error(err));
}

const flashHandler = (data, res, req, form, msg) => {
		let flashMsg = {
			'Cantact_already_exist': `Contact with email: ${form.email} or phone number: ${form.numberPhone} already exist`,
			'Not_valid_email_or_phone_data' : `Email: ${form.email} or phone: ${form.numberPhone} data, not valid` 
		}

		res.send(flashMsg[msg]);
}


const checknPhoneValid = number => {
	let ints = number.split('').filter(int => Number(int) !== NaN);
	console.log(ints.length >= 10 && 15 >= ints.length);
	return ints.length >= 10 && 15 >= ints.length;
}


const checkEmailValid = email => {
	let requiredСhars = email.split('').filter(char  => char === '@' || char === '.')
	console.log(requiredСhars);
	return requiredСhars.length >= 2 && requiredСhars[1] === '.'; 
}


const checkExistContact = (db, form, id=false) => {
	return new Promise((res, rej) =>{
		id ?`SELECT * FROM contacts WHERE id!=${id} AND (email=(?) OR number_phone=(?))`
		   :`SELECT * FROM contacts WHERE email=(?) OR number_phone=(?)`;	 		
	 	let data = [form.email, form.numberPhone];
	 	 	
	 	db.get(sql, data, (err, data) => {						
			data === undefined? rej(err): res(data);
		});
	});
}


const contactUpdater = (res, req, form, db, cookie, id) => {
	if(checkEmailValid(form.email) && checknPhoneValid(form.numberPhone)) {
		let data = [form.name, form.lastname, form.email, form.numberPhone, id]; 
		db.run(`UPDATE contacts SET name=(?), lastname=(?), email=(?), number_phone=(?)  WHERE id=(?)`, data, err => {
			if (err) {
    			return console.error(err.message);
 			}
 			console.log(`Contact updated, id: ${id}`);
 			res.send(`Contact updated, id:${id}.`);
		});
	}
	else {
		flashHandler(null, res, req, form, 'Not_valid_email_or_phone_data')
	}
}


const contactCreater = (res, req, form, db, cookie) => {	
	let img = req.body.img;
	let imgpath = '';

	if(checkEmailValid(form.email) && checknPhoneValid(form.numberPhone)) {
		
		let imgFileName = `${form.lastname}${form.email.split('@')[0]}@${form.email.split('@')[1].split('.')[0]}.png`; 
		
		fs.writeFile(path.join(__dirname, `./view/sessionsImg/${cookie}/${imgFileName}`), img, {encoding : 'base64'}, err => {
			if(err){
		 		console.log(err);
				return;
			}
			imgpath =  `./sessionsImg/${cookie}/${imgFileName}`;	
			db.run(`INSERT INTO contacts(name, lastname, number_phone, email, img) VALUES('${form.name}', '${form.lastname}', '${form.numberPhone}', '${form.email}', '${imgpath}');`);
			res.redirect('/readContacts');
		});
	}
	else {
		flashHandler(null, res, req, form, 'Not_valid_email_or_phone_data')
	}
}


const createContact = (response, request, db, cookie) => {
	let form = request.body.form;
	cookie = cookie.split('=')[1]; 
	checkExistContact(db, form)
	.then(data =>  flashHandler(data, response, request, form, 'Cantact_already_exist'))
	.catch(() => contactCreater(response, request, form, db, cookie));
	
}

const updateContact = (response, request, db, cookie, id) => {
	let form = request.body.form;
	cookie = cookie.split('=')[1]; 
	checkExistContact(db, form, id)
	.then(data =>  flashHandler(data, response, request, form, 'Cantact_already_exist'))
	.catch(() => contactUpdater(response, request, form, db, cookie, id));
}




module.exports.selectAll = selectAll;
module.exports.updateContact = updateContact;
module.exports.selectContactForUpdate = selectContactForUpdate;
module.exports.createContact = createContact;
