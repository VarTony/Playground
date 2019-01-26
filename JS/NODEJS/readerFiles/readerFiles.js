const fs = require('fs');
// const Promise = require('promise');

function reverse (pathFile, callback = console.log) {
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

reverse('./file', console.log);

