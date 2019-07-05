const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const mv = (userName, req, res, targetName) => {
  userName = helpers.searchUserDir(userName);
  let folderPath = pwd.read()(userName);
  let legalPath = helpers.checkFileExist(userName, folderPath, targetName);
  if(legalPath) fs.unlink(path.join(__dirname, `../../users/${userName}${folderPath}${targetName}`), err => err? console.error(err): res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native', 'data':''}));
  else res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native',  'data':`File with name ${fileName} not found`});
}

module.exports = mv;
