const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const touch = (userName, req, res, fileName) => {
  userName = helpers.searchUserDir(userName);
  let folderPath = pwd.read()(userName);
  fs.writeFile(path.join(__dirname, `../../users/${userName}${folderPath}${fileName}`), `${fileName}`, err => err? console.error(err) : res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native', 'data':''}));
}

module.exports = touch;
