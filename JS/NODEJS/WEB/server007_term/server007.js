const express = require('express');
const app = express();
const port = 1984;
const path = require('path');
const jsonParser = express.json();
const bodyParser = require('body-parser');
const ls = require('./term_comands/main/ls');
const cd = require('./term_comands/main/cd');
const pwd = require('./term_comands/main/pwd');
const comands =  {'ls' : ls, 'cd': cd, 'pwd' : pwd.read(true)};

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/',  (req, res) => {
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});

app.post('/termComand',  (req, res) => {
 let comand = req.body.comand.split(' ')[0];
 let argument = req.body.comand.split(' ')[1];
 console.log(argument);
 console.log(req.body);
 if(comands[comand]) argument ?comands[comand](req, res, argument) :comands[comand](req, res);
 else res.send(`Command '${comand}' not found.`)
});



app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
