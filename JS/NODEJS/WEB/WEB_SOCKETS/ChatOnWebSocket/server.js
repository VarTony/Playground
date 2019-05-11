const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const config = require('./config.js');
const path = require('path');

app.use(express.static('view'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'view/chat.html'));
});

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'old/client.html'));
// });



app.get('/content/callAlert.mp3', (req, res) => {
	res.sendFile(path.join(__dirname + '/content/callAlert.mp3'));	
})

socket.on('connection', io => {
	// console.log(io);
	console.log('connection new client');
	io.on('sendMSG', msg => {
		socket.emit('Broadcast msg', msg);

	});
});

http.listen(config.PORT, err => 
	err ? console.log(err) : console.log(`Server run on port ${config.PORT}`));

//, '192.168.1.155'