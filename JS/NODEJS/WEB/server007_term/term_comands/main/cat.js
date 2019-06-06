const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cat = (req, res, fileName) => {
  let folderPath = pwd.read()();

  let legalPath = helpers.checkFileExist(folderPath, fileName);
  if(legalPath) fs.readFile(path.join(__dirname, `${folderPath}${fileName}`), 'utf-8', (err, data) => err? console.error(err): res.send({'type':'data', 'data':data}));
  else res.send({'type':'native',  'data':`File with name ${fileName} not found`});
}


module.exports = cat;
