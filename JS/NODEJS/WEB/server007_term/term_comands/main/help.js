const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const help = (userName, req, res) => {
  userName = helpers.searchUserDir(userName);
  fs.readFile(path.join(__dirname, `../../users/${userName}/system_files/helpFile`), 'utf-8', (err, data) => err? console.error(err): res.send({'userString': helpers.getUserString(userName, req, res), 'type':'code', 'data':data}));
}

module.exports = help;
