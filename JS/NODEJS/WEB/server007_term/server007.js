const express = require('express');
const fs = require('fs');
const app = express();
const port = 1984;
const path = require('path');
const uuidv4 = require('uuid/v4');
const jsonParser = express.json();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const termComands = require('./term_comands/termComandsFacade');
const helpersOfTerm = require('./term_comands/main/helpers')
const comands =  {
	'ls' : termComands.ls,
 	'cd': termComands.cd,
  'pwd' : termComands.pwd.read(true),
	'touch' : termComands.touch,
	'mv' : termComands.mv,
	'cat' : termComands.cat,
	'help' : termComands.help
}
let cookie;


/////////////////////////helpers///////////////////////////


const createNewUserId = () => {
	let usersDirList = fs.readdirSync(path.join(__dirname, 'users'));
	let userId = uuidv4();
	let checkSuccess = false;
	while(!checkSuccess) {
		checkSuccess = usersDirList.map(uId => uId.split(':')[1]).filter(uId => uId.split('|')[0] === userId)[0]? false : true;
		userId = checkSuccess? userId: uuidv4();
	}
	return userId;
}

const sortFilesSync = dirname => {
	// console.log('nioij0jio||||||', dirname);
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

const newUserCreator = (req, res, userId) => {
  fs.mkdir(path.join(__dirname, `/users/user:${userId}|30`), err => {
		 if(err)	{
			 console.error(err);
			 return;
		 }
		 recursiveCopyFiles(path.join(__dirname, 'term_comands/main/home'),   path.join(__dirname, `/users/user:${userId}|30`));
		 console.log(`dir user:${userId} maked`);
	 });
}


/////////////////////////
const rmdirRecursiveSync = dirName => {
	let sortedList = sortFilesSync(dirName);
	sortedList.files.map(fileName =>  fs.unlinkSync(path.join(dirName, fileName)));
	sortedList.directories.map(dir =>  rmdirRecursiveSync(path.join(dirName, dir)));
	fs.rmdirSync(dirName);
}


const renameUserdir = (dirName, userId, time) => {
	console.log(dirName);
	fs.rename(path.join(__dirname, `./users/${dirName[0]+'|'+dirName[1]}`), path.join(__dirname, `./users/${userId}|${time}`), err => //./users/${dirName[0]+'|'+dirName[1]}
		err? console.error(err): console.log('success'));
}

const checkTimeUser = userDir => {
	dirName = userDir.split('|');
	console.log(dirName, 'userDir : ', userDir);
	let userId = dirName[0];
	let time = +(dirName[1]);
	time = time - 5;
	if(time <= 0) rmdirRecursiveSync(path.join(__dirname, `users/${userDir}`));
	else renameUserdir(dirName, userId, time);
}

const userDirControler = () =>{

	fs.readdir(path.join(__dirname, './users'), (err, dirUser) => {
		if(err){
			console.error(err)
			return;
		}

		dirUser.map(dirUser => checkTimeUser(dirUser));
	});
}

////////////////////////////

////////////////////////////////////////////////////////


app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser('cookie'));

setInterval(userDirControler, 15000); //(60000 * 5)

app.get('/',  (req, res) => {
	console.log(req.headers.cookie, ': req.headers.cookie');
	if(!req.headers.cookie) {
		cookie = createNewUserId();
		console.log(cookie, 'if');
		newUserCreator(req, res, cookie);
	}
	else cookie = req.headers.cookie.split('=')[1].split(':')[1];

	console.log(cookie, ': cookie');
	res.setHeader('Set-Cookie', `cookie=user:${cookie}`, {maxAge:  new Date(Date.now() + 1800)});
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});


app.post('/termComand',  (req, res) => {
 let comand = req.body.comand.split(' ')[0];
 let argument = req.body.comand.split(' ')[1];
 let userName = req.headers.cookie.split('=')[1];
 if(comands[comand]) argument ?comands[comand](userName, req, res, argument) :comands[comand](userName, req, res);
 else res.send({'userString' : helpersOfTerm.getUserString(userName, req, res), 'type':'native', 'data':`Command '${comand}' not found.`})
});


app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
