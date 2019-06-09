const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cat = (userName, req, res, fileName) => {
  let folderPath = pwd.read()(userName);
  let legalPath = helpers.checkFileExist(userName, folderPath, fileName);
  if(legalPath) fs.readFile(path.join(__dirname, `../../users/${userName}${folderPath}${fileName}`), 'utf-8', (err, data) => err? console.error(err): res.send({'userString': helpers.getUserString(userName, req, res), 'type':'code', 'data':data}));
  else res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native',  'data':`File with name ${fileName} not found`});
}


module.exports = cat;
