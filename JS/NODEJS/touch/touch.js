const fs = require('fs');
const filepath = process.argv[2];
const dataForFile = process.argv[3];

const touch = (filepath, dataForFile = '') => new Promise((res, rej) => 
		fs.readFile(filepath, 'utf-8', (err, data) =>
							err ? rej(err) : res(data)))
									.then(() =>  console.log('Файл с таким именем уже существует'))
									.catch(() => fs.writeFile(filepath, dataForFile, err => !err 
																? console.log(`Файл ${filepath} был успешно создан`) 
																: console.log(`Ошибка : ${err}`)));

touch(filepath, dataForFile);
