const path = require('path');
const uuidv4 = require('uuid/v4');
const fs = require('fs');


const createNewUserId = () => {
	let usersDirList = fs.readdirSync(path.join(__dirname, '../users'));
	let userId = uuidv4();
	let checkSuccess = false;
	while(!checkSuccess) {
		checkSuccess = usersDirList.map(uId => uId.split(':')[1]).filter(uId => uId.split('|')[0] === userId)[0]? false : true;
		userId = checkSuccess? userId: uuidv4();
	}
	return userId;
}

const sortFilesSync = dirname => {
	let fileNames = fs.readdirSync(dirname);
	let files = fileNames.filter(fileName =>  fs.statSync(path.join(dirname, fileName)).isFile());
	let directories = fileNames.filter(fileName =>  fs.statSync(path.join(dirname, fileName)).isDirectory());
	return {files, directories};
}

const recursiveCopyFiles = async (dirname, newUserDir) => {
	let sortedList = sortFilesSync(dirname);
	sortedList.directories.map(dir => fs.mkdirSync(path.join(newUserDir, dir)));
	sortedList.files.map(file =>  fs.copyFileSync(path.join(dirname, file),  path.join(newUserDir, file)));
	sortedList.directories.map(dir => recursiveCopyFiles(path.join(dirname,  dir), path.join(newUserDir, dir)));
	return;
}

const createNewUser = (req, res, userId) => {
  fs.mkdir(path.join(__dirname, `../users/user:${userId}|120`), err => {
		 if(err)	{
			 console.error(err);
			 return;
		 }
		 recursiveCopyFiles(path.join(__dirname, '../term_comands/main/home'),   path.join(__dirname, `../users/user:${userId}|120`));
		 console.log(`dir user:${userId} maked`);
	 });
}

module.exports.createNewUser = createNewUser;
module.exports.createNewUserId = createNewUserId;
module.exports.sortFilesSync = sortFilesSync;
