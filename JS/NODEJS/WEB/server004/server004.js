const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/server004.db');
const port = 1971;


app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/', jsonParser, (req, res) => {
	res.sendFile(path.join(__dirname, '/view/server004.html'));
});

app.post('/createContact', (req, res) => {

	console.log('А-ю-ю');
	console.log(req.body);

	res.send('Маленько обожди,парень');


});



app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));