const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const config = require('./config.js');

app.use(express.static('view'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client.html');
});

socket.on('connection', io => {
	console.log('connection new client');
	io.on('sendMSG', msg => {
		socket.emit('Broadcast msg', msg);

	});
});

http.listen(config.PORT, err => 
	err ? console.log(err) : console.log(`Server run on port ${config.PORT}`));