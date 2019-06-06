const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');

const touch = (req, res, fileName) => {
  let folderPath = pwd.read()();
  fs.writeFile(path.join(__dirname, `./${folderPath}${fileName}`), `${fileName}`, err => err? console.error(err) : res.send({'type':'native', 'data':''}));
}

module.exports = touch;
