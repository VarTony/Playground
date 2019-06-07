const express = require('express');
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
	'cat' : termComands.cat
}
let cookie;


/////////////////////////helpers///////////////////////////

// const checkCookieExist = (req, res) => {
// 		cookie = !req.headers.cookie? uuidv4() : res.clearCookie('cookie') &&  req.headers.cookie.split('=')[1] && res.redirect('/');
//
//
// }




////////////////////////////////////////////////////////








app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser('cookie'));

app.get('/',  (req, res) => {
	console.log(req.headers.cookie, ': req.header.cookie');

	cookie = !req.headers.cookie? uuidv4() : req.headers.cookie.split('=')[1].split(':')[1];
	console.log(cookie, ': cookie');

	res.setHeader('Set-Cookie', `cookie=user:${cookie}`, {maxAge:  new Date(Date.now() + 1800)});
	// res.clearCookie('cookie'); res.redirect('/');
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});

app.post('/termComand',  (req, res) => {
 let comand = req.body.comand.split(' ')[0];
 let argument = req.body.comand.split(' ')[1];
 console.log(argument);
 console.log(req.body);
 if(comands[comand]) argument ?comands[comand](req, res, argument) :comands[comand](req, res);
 else res.send({'userString' : helpersOfTerm.getUserString(req, res), 'type':'native', 'data':`Command '${comand}' not found.`})
});



app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
