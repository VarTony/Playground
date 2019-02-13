const fs = require('fs');
const fileName = process.argv[2];
// const Promise = require('promise');

function reverse (pathFile = './file', callback = console.log) {
	fs.readFile(pathFile, 'utf-8',  (err, data) => {

		if(err){
			callback(err);
			return;
		}
		const revData = [];
		data = data.split('\n');
		data.map(value => revData.unshift(value));
		data = revData.join('\n');
		fs.writeFile(pathFile, data, callback);

	});
}

reverse(fileName, console.log);

module.exports = reverse;



