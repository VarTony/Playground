const fs = require('fs');


function UserException(message) {
   this.message = message;
   this.name = "Исключение, определенное пользователем";
}

const buffers = new Array();
const readerStream = fs.createReadStream('./file', 'utf-8'); //По сути операция асинхронна, но ...
const writeStream = fs.createWriteStream('./copyFile');


readerStream.on('data', (chunk) => { 
	console.log(chunk.length);

	// fs.writeFile('./copyFile', chunk, (err) => err ? console.log('Что-то пошло не так : ', err)
	 // : console.log('Запись прошла успешно'); //так как эта операция так же ассинхронна и при этом паралельна(её записи стрим не ждет а выдает новые данные) буфер забьется.

	// fs.writeFileSync('./copyFile', Buffer.concat(buffers)); //Тоже самое только операция синхронная и работает паралельно (буффер не успеет очистится до нового потока данных);


	 // throw new UserException("На сегодня хватит");

	// writeStream.write(chunk); //Почему-то запишет. // Возможно разбивает текущий chunk на части которые успевают записаться в буфер и очистится.

	buffers.push(new Buffer(chunk)); // Альтернатива  потоку на запись

});

readerStream.on('end', (chunk) =>{
 console.log(buffers[0]);
 fs.writeFileSync('./copyFile', Buffer.concat(buffers));

});


setTimeout(() => console.log('таймер на 10'), 10); 
console.log('after');

