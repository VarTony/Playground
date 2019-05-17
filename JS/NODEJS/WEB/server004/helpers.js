const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
// const sqlite3 = require('sqlite3').verbose();

let timeDbChanged = false;

const checknPhoneValid = number => {
	let ints = number.split('').filter(int => Number(int) !== NaN);
	console.log(ints.length >= 10 && 15 >= ints.length);
	return ints.length >= 10 && 15 >= ints.length;
}


const charsControler = (char) => {
	const stopChars = ['$', '{', '}', '[', ']', '\\', '<', '/', '>', '#', '%', '`', '\'', '"'];
	let i = 0;
	while(stopChars.length -1 >= i) {
		if(stopChars[i] === char) return false;
		i++;
	}
	return true;
}

const dataValidator = form => {
	console.log('form :    |||| ', form)
	for(let key in form) form[key] = form[key].split('').filter(char => charsControler(char)).join('');
}


const checkEmailValid = email => {
	let requiredСhars = email.split('').filter(char  => char === '@' || char === '.')
	console.log(requiredСhars);
	return requiredСhars.length >= 2 && requiredСhars[1] === '.';
}

const createNewDataBase = (req, res, db, cookie, sqlite3) => {
	fs.copyFileSync(path.join(__dirname, '/db/server004.db'), path.join(__dirname, `/db/copiesDb/${cookie}|30.db`));
	fs.mkdirSync(path.join(__dirname, `/view/sessionsImg/${cookie}`));
	db = new sqlite3.Database(`./db/copiesDb/${cookie}|30.db`);
	res.set('Cache-Control', 'no-cache');
	res.sendFile(path.join(__dirname, '/view/server004.html'));
	return db;
}


const createNewUserName = (req, res, checkExistDb) => {
	newUser = uuidv4();
	while(true) {
		console.log(!checkExistDb(newUser));
		if(checkExistDb(newUser, true)) newUser = uuidv4();
		else {
			res.setHeader('Set-Cookie', `cookie=user:${newUser}`, {maxAge:  new Date(Date.now() + 1800)});
			return `user:${newUser}`;
		}
	}
}


module.exports.checknPhoneValid = checknPhoneValid;
module.exports.checkEmailValid = checkEmailValid;
module.exports.dataValidator = dataValidator;
module.exports.createNewDataBase = createNewDataBase;
module.exports.createNewUserName = createNewUserName;
