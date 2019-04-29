const fs = require('fs');
const path = require('path');

const selectAll = (req, res, db, offset = 1) => { 
	
	new Promise((res, rej) =>
		db.all(`SELECT * FROM contacts LIMIT 5 OFFSET ${offset};`, (err, data) => { //each						
			err? rej(err): res(data)
	})).then(data =>  {		
		console.log(data);
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




const deleteAll = (db, superUser) =>	{
		db.run(`DELETE FROM contacts WHERE name!=(?);`, superUser, err => err 
			? console.log(err) 
			: console.log('successful'));
	}


const flashHandler = (data, res, req, form) => {
		req.flash('Cantact_already_exist', `Contact with email: ${form.email} or phone number: ${form.numberPhone} already exist`)
		console.log(req.flash('Cantact_already_exist'))
		res.send(JSON.stringify(req.flash('Cantact_already_exist')))
}


const checkExistContact = (db, form) => {
	return new Promise((res, rej) =>{
	 	db.get(`SELECT * FROM contacts WHERE email=? OR number_phone=?`, 
	 		[form.email, form.numberPhone], (err, data) => {						
			data === undefined? rej(err): res(data);
		});
	});
}


const contactCreater = (res, req, form, db, cookie) => {	
	let img = req.body.img;
	let imgpath = '';

	fs.writeFile(path.join(__dirname, `./view/sessionsImg/${cookie.split('=')[1]}/${form.name + form.lastname}.png`), img, {encoding : 'base64'}, err => {
		if(err){
		 	console.log(err);
			return;
		}
		imgpath =  `./imgs/${form.name + form.lastname}.png`;	
		db.run(`INSERT INTO contacts(name, lastname, number_phone, email, img) VALUES('${form.name}', '${form.lastname}', '${form.numberPhone}', '${form.email}', '${imgpath}');`);
		res.redirect('/readContacts');
			
		});


}

const validator = (response, request, db, cookie) => {
	let form = request.body.form; 

	checkExistContact(db, form)
	.then(data =>  flashHandler(data, response, request, form))
	.catch(() => contactCreater(response, request, form, db, cookie));
	}




module.exports.selectAll = selectAll;
module.exports.deleteAll = deleteAll;
module.exports.selectContactForUpdate = selectContactForUpdate;
module.exports.validator = validator;


//flash
			// console.log(data);	
		// request.flash('Cantact_already_exist', `Contact with email: ${form.email} or phone number: ${form.numberPhone} already exist`)
		// console.log(request.flash('Cantact_already_exist'))
		// response.send(JSON.stringify(req.flash('Cantact_already_exist')))


//checkExistContact
			// new Promise((res, rej) =>
	// 	db.get(`SELECT * FROM contacts WHERE email=? OR number_phone=?`, [form.email, form.numberPhone], (err, data) => {						
	// 		data === undefined? rej(err): res(data) // rewrite on 'err? rej(err): res(data)' after update database
	// })