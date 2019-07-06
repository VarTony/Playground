const path = require('path');
const sortFilesSync = require('./newUserCreator').sortFilesSync;
const fs = require('fs');


const rmdirRecursiveSync = dirName => {
	let sortedList = sortFilesSync(dirName);
	sortedList.files.map(fileName =>  fs.unlinkSync(path.join(dirName, fileName)));
	sortedList.directories.map(dir =>  rmdirRecursiveSync(path.join(dirName, dir)));
	fs.rmdirSync(dirName);
}

const renameUserdir = (dirName, userId, time) => {
	fs.rename(path.join(__dirname, `../users/${dirName[0]+'|'+dirName[1]}`), path.join(__dirname, `./users/${userId}|${time}`), err =>
		err? console.error(err): console.log('success'));
}

const checkTimeUser = userDir => {
	dirName = userDir.split('|');
	let userId = dirName[0];
	let time = +(dirName[1]);
	time = time - 5;
	if(time <= 0) rmdirRecursiveSync(path.join(__dirname, `../users/${userDir}`));
	else renameUserdir(dirName, userId, time);
}

const userDirControler = () =>{

	fs.readdir(path.join(__dirname, '../users'), (err, dirUser) => {
		if(err){
			console.error(err)
			return;
		}

		dirUser.map(dirUser => checkTimeUser(dirUser));
	});
}

module.exports.userDirControler = userDirControler;
