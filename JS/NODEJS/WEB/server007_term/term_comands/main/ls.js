const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

const ls = (req, res) => {
  const dirpath = helpers.creatorPath();
  const NameOfFile = [];
  fs.readdir(dirpath,  (err, filenames) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(filenames);
    // filenames = filenames.map(file => fs.statSync(dirpath + file).isDirectory()? `${file}|dir` : `${file}|file`  )
    const result = filenames.join(' \n ');
    res.send({'type':'data', 'data':result});
  });
}
module.exports = ls;
