const express = require('express');
const fs = require('fs');
const app = express();
const port = 1984;
const path = require('path');
const jsonParser = express.json();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const termComands = require('./term_comands/termComandsFacade');
const helpersOfTerm = require('./term_comands/main/helpers');
const newUserCreator = require('./helpersForServer/newUserCreator');
const userDirControler = require('./helpersForServer/userDirControler').userDirControler;
const comands =  {
	'ls' : termComands.ls,
 	'cd': termComands.cd,
  'pwd' : termComands.pwd.read(true),
	'touch' : termComands.touch,
	'rm' : termComands.rm,
	'cat' : termComands.cat,
	'help' : termComands.help
}
let cookie;


app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser('cookie'));

setInterval(userDirControler, (60000 * 5));

app.get('/',  (req, res) => {
	console.log(req.headers.cookie, ': req.headers.cookie');
	if(!req.headers.cookie) {
		cookie = newUserCreator.createNewUserId();
		console.log(cookie, 'if');
		newUserCreator.createNewUser(req, res, cookie);
	}
	else {
		cookie = req.headers.cookie.split('=')[1].split(':')[1];
		if(!helpersOfTerm.searchUserDir(cookie)) {
				res.clearCookie('cookie');
				res.redirect('/');
				return;
		}
	}

	console.log(cookie, ': cookie');
	res.setHeader('Set-Cookie', `cookie=user:${cookie}`, {maxAge:  new Date(Date.now() + 1800)});
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});


app.post('/termComand',  (req, res) => {
	if(!helpersOfTerm.searchUserDir(`user:${cookie}`)) {
			res.send({
			'userString' : `user:NaN`,
			'type':'code',
			 'data':`A user with this name has not yet been created, or his time is up.
			 	Please reload the page to start a new session`
		 });
		 return;
		}
 let comand = req.body.comand.split(' ')[0];
 let argument = req.body.comand.split(' ')[1];
 let userName = req.headers.cookie.split('=')[1];
 if(comands[comand]) argument ?comands[comand](userName, req, res, argument) :comands[comand](userName, req, res);
 else res.send({'userString' : helpersOfTerm.getUserString(userName, req, res), 'type':'native', 'data':`Command '${comand}' not found.`});
});


app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
