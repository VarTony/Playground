const path = require('path');
const fs = require('promise-fs');
const dirpath = process.argv[2];

const ls = (dirpath = __dirname, NameOfFile = []) => 
  fs.readdir(dirpath)
  .then(filenames => filenames
    .map((filename, i=0) => {
  	NameOfFile[i] = filename;
  	i++;
    return path.join(dirpath, filename);
    })
    .map(path => new Promise((res,rej) => fs.stat(path, (err, data) => err ? rej(err): res(data)))))
  .then(promises => Promise.all(promises))
  .then(stats => stats
  	.filter(stat => stat.isFile())
  	.reduce((acc,stat,i=0) => {
  	 acc += ` ${NameOfFile[i]} \n size : ${stat['size'] / 1000}kb \n\n`
  	 i++;
  	 return acc;
  	}, '')).then(result => console.log(result));



ls(dirpath);

module.exports = ls;