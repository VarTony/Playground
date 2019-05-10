const express = require('express');
const app = express();
const port = 1984;
const path = require('path');

app.use(express.static('view'));

app.get('/',  (req, res) => {
	res.sendFile(path.join(__dirname, 'view/server007.html'));
});


app.listen(port,  err => err ? console.error(err): console.log(`Server run on port, ${port}.`));