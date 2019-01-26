const fs = require('fs');
const filepath = process.argv[2];
const copyfile = process.argv[3];

const cp = (pathfile, pathForCopy, callback = console.log) => 
	fs.readFile(pathfile, 'utf-8',  (err, data) =>  err 
			?callback(err)  
				:fs.writeFile(pathForCopy, data, callback));


cp(filepath, copyfile); // cp('../readerFiles/file', './file');