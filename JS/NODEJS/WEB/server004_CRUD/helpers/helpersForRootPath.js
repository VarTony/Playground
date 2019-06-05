const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const helpersForControlUserTime = require('./helpersForControlUserTime');


const createNewDataBase = (req, res, db, cookie, sqlite3) => {
	fs.copyFileSync(path.join(__dirname, '../db/server004.db'), path.join(__dirname, `../db/copiesDb/${cookie}|30.db`));
	fs.mkdirSync(path.join(__dirname, `../view/sessionsImg/${cookie}`));
	db = new sqlite3.Database(path.join(__dirname, `../db/copiesDb/${cookie}|30.db`));
	res.set('Cache-Control', 'no-cache');
	res.sendFile(path.join(__dirname, '../view/server004.html'));
	return db;
}



const createNewUserName = (req, res, checkExistDb) => {
	newUser = uuidv4();
	while(true) {
		if(helpersForControlUserTime.checkExistDb(newUser, true).exist) newUser = uuidv4();
		else {
			res.setHeader('Set-Cookie', `cookie=user:${newUser}`, {maxAge:  new Date(Date.now() + 1800)});
			return `user:${newUser}`;
		}
	}
}

const writeLogs = req => {
	console.log(
	 `cookie: ${req.headers.cookie}\n`,
	 `method: ${req.method}\n`,
	 `protocol: ${req.protocol}\n`,
	 `accepts: ${req.accepts(['text/html', 'image/png', 'application/javascript', 'text/javascript', 'text/css'])}\n`,
	 `ip : ${req.ip}`
	);
}


module.exports.createNewDataBase = createNewDataBase;
module.exports.createNewUserName = createNewUserName;
module.exports.writeLogs = writeLogs;
