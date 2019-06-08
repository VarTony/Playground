const express = require('express');
const fs = require('fs');
const app = express();
const port = 1984;
const path = require('path');
const uuidv4 = require('uuid/v4');
const jsonParser = express.json();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
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
		checkSuccess = usersDirList.map(uId => uId.split(':')[1]).filter(uId =>  uId === userId)[0]? false : true;
		userId = checkSuccess? userId: uuidv4();
	}
	return userId;
}

const sortFilesSync = (dirname) => {
	let fileNames = fs.readdirSync(dirname);
	// console.log('dirname:', dirname);
	let files = fileNames.filter(fileName =>  fs.statSync(path.join(dirname, fileName)).isFile());
	// console.log('files:', files);
	let directories = fileNames.filter(fileName =>  fs.statSync(path.join(dirname, fileName)).isDirectory());
	// console.log('directories:', directories);
	return {files, directories};
}

const recursiveCopyFiles = (dirname, newUserDir) => {
	 let sortedList = sortFilesSync(dirname);
	// console.log('sortedList : ', sortedList);
	// if(dirname.splite('/')[dirname - 1] === 'home') {
		// sortedList = sortedList.directories.map(dir => dir === 'original_system_files'? 'system_files': dir);
	// }
	// console.log('directories : ', sortedList.directories);
	// console.log('dirname : ', dirname);
	sortedList.directories.map(dir => fs.mkdirSync(path.join(newUserDir, dir)));
	sortedList.files.map(file =>  fs.copyFile(path.join(dirname, file),  path.join(newUserDir, file), err => err? console.error(err): console.log(`file ${file} success copied`)));
	sortedList.directories.map(dir => recursiveCopyFiles(path.join(dirname,  dir), path.join(newUserDir, dir)));
	return;
}



const newUserCreator = userId => {
	fs.mkdir(path.join(__dirname, `/users/user:${userId}`), err => {
		 if(err)	{
			 console.error(err);
			 return;
		 }
		 recursiveCopyFiles(path.join(__dirname, 'term_comands/main/home'),   path.join(__dirname, `/users/user:${userId}`));
		 	// console.log(sortFiles(__dirname));
			console.log(`dir user:${userId} maked`);
	 });
}

////////////////////////////////////////////////////////



app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser('cookie'));


app.get('/',  (req, res) => {
	console.log(req.headers.cookie, ': req.headers.cookie');
	// cookie = !req.headers.cookie? newUserCreator(createNewUserId()): req.headers.cookie.split('=')[1].split(':')[1];
	if(!req.headers.cookie) {
		cookie = createNewUserId();
		newUserCreator(cookie);
	}
	else cookie = req.headers.cookie.split('=')[1].split(':')[1];

	console.log(cookie, ': cookie');
	res.setHeader('Set-Cookie', `cookie=user:${cookie}`, {maxAge:  new Date(Date.now() + 1800)});
	// res.clearCookie('cookie'); res.redirect('/');
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});


app.post('/termComand',  (req, res) => {
 let comand = req.body.comand.split(' ')[0];
 let argument = req.body.comand.split(' ')[1];
console.log('cookie2s', req.headers);
 let userName = req.headers.cookie.split('=')[1];
 // console.log(argument);
 // console.log(req.body);
 if(comands[comand]) argument ?comands[comand](userName, req, res, argument) :comands[comand](userName, req, res);
 else res.send({'userString' : helpersOfTerm.getUserString(userName, req, res), 'type':'native', 'data':`Command '${comand}' not found.`})
});


app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
