const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const mv = (req, res, targetName) => {
  let folderPath = pwd.read()();
  let legalPath = helpers.checkFileExist(folderPath, targetName);
  if(legalPath) fs.unlink(path.join(__dirname, `./${folderPath}${targetName}`), err => err? console.error(err): res.send({'userString': helpers.getUserString(req, res), 'type':'native', 'data':''}));
  else res.send({'userString': helpers.getUserString(req, res), 'type':'native',  'data':`File with name ${fileName} not found`});
}

module.exports = mv;
