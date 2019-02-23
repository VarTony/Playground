const express = require('express');
const app = express();
const port = 1981;
const jsonParser = express.json();
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/public/xhttp.html`);
});

app.post('/', jsonParser, (req, res) => {

	if(!req.body) return res.sendStatus(400);
	console.log(req.body);
	// res.send(req.body);
	res.json(`${req.body.email} : ${req.body.password}`);
});

app.listen(1981, err => err ? console.log(err): console.log(`server run on port ${port}`));