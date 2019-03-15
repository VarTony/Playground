const express = require('express');
const app = express();
const port = 1953;

app.use(express.static('view'));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/view/index.html`);
	// res.end();
});


app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));



