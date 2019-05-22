const express = require('express');
const app = express();
const port = 1984;
const path = require('path');
const jsonParser = express.json();
const bodyParser = require('body-parser');
const ls = require('./term_comands/main/ls');
const comands =  {'ls' : ls};

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/',  (req, res) => {
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});

app.post('/termComand',  (req, res) => {
 let comand = req.body.comand;
 console.log(req.body);
 if(comands[comand]) comands[comand](res, req);
 else res.send(`Command '${comand}' not found.`)
});



app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));
