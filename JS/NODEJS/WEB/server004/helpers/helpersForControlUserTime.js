const fs = require('fs');
const path = require('path');

const connectToDatabase = (cookie, nameDb, sqlite3) =>  {
	timeDbChanged = false;
	let timeDb = nameDb[0].split('|')[1].split('.')[0];
	db = new sqlite3.Database(path.join(__dirname, `../db/copiesDb/${cookie.split('=')[1]}|${timeDb}.db`));
	return db;
}


const checkExistDb = (cookie, newUser = false) => {
	let dbList = fs.readdirSync(path.join(__dirname, '../db/copiesDb'));
	cookie = !newUser ? cookie.split('=')[1] : cookie;
	console.log(cookie);
	let nameDb = dbList.filter(nameDb => nameDb.split('|')[0] === cookie);
	return {exist : (nameDb.length >= 1), nameDb : nameDb};
}


const rmdirRecursiveSync = dirPath => {
	let filesList = fs.readdirSync(path.join(__dirname, dirPath));
	filesList.map(fileName =>  fs.unlinkSync(path.join(__dirname, `${dirPath}/${fileName}`)));
	fs.rmdirSync(path.join(__dirname, dirPath));
}


const deleteUserData = (db, id) => {
fs.unlink(path.join(__dirname, `../db/copiesDb/${db[0]+'|'+db[1]}`),
	err =>{
		if(err){
			console.error(err);
			return;
		}
		rmdirRecursiveSync(path.join(__dirname, `../view/sessionsImg/${id}`));
		console.log(`Files destroyed : ${id}`);
	});
}


const renameDatabase = (db, id, time) => {
	console.log(id);
	fs.rename(path.join(__dirname, `../db/copiesDb/${db[0]+'|'+db[1]}`), path.join(__dirname, `../db/copiesDb/${id}|${time}.db`), err =>
		err? console.error(err): console.log('success'));
}


const checkTimeUser = (db) => {
	db = db.split('|');
	let id = db[0];
	let time = +(db[1].split('.')[0]);
	time = time - 5;
	if(time <= 0) deleteUserData(db, id);
	else renameDatabase(db, id, time);
}


const dbControler = () =>{

	fs.readdir(path.join(__dirname, '../db/copiesDb'), (err, data) => {
		if(err){
			console.error(err)
			return;
		}

		data.map(db => checkTimeUser(db));
	});
}


module.exports.dbControler = dbControler;
module.exports.checkExistDb = checkExistDb;
module.exports.connectToDatabase = connectToDatabase;
