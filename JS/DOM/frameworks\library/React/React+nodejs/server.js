const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 1953;
const jsonParser = express.json();
const bodyParser = require('body-parser');
let iImgs = 0;

app.use(express.static('view'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/', (req, res) => {

	console.log('get');
	res.sendFile(`${__dirname}/view/index.html`);
	// res.end();
});



app.post('/handlerImg', jsonParser, (req, res) => { //jsonParser,
	
	let data = req.body.data;
	if(iImgs >= 9) iImgs = 0;

	fs.writeFile(path.join(__dirname, `./view/imgs/saves/img${iImgs}.png`), data, {encoding : 'base64'}, err => {

		if(err){
		 console.log(err);
		 return;
		}
		// app.use(express.static('view'));
		let imgpath = `../imgs/saves/img${iImgs}.png`;
		res.send(imgpath);

		console.log('ok');
		setTimeout(() => iImgs++, 5);
		return;


	});





	// fs.writeFile(path.join(__dirname, '/file'), 'writemsg', (err) => err? console.log(err): console.log('write :', path.join(__dirname, '/file')));

	// console.log(req);
	// fs.writeFile(path.join(__dirname ,'./view/imgs/saves'), 'view/src/imgs/saves/01save.png', () => {
	// // 	console.log(req.body);

	// });

});


app.listen(port, err => !err ? console.log(`server work on port ${port}`) : console.log(`Error : ${err}`));



