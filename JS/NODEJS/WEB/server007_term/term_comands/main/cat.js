const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cat = (userName, req, res, fileName) => {
  userName = helpers.searchUserDir(userName);
  let folderPath = pwd.read()(userName);
  let legalPath = helpers.checkFileExist(userName, folderPath, fileName);
  let data = '';
  let streamOfFile = fs.ReadStream(path.join(__dirname, `../../users/${userName}${folderPath}${fileName}`), {encoding : 'utf-8'});
  streamOfFile.on('error', error =>  res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native', 'data':`${error}`}));
  streamOfFile.on('readable', () => data += streamOfFile.read());
  streamOfFile.on('end', () => res.send({'userString': helpers.getUserString(userName, req, res), 'type':'code', 'data':data}));
  // if(legalPath) fs.readFile(path.join(__dirname, `../../users/${userName}${folderPath}${fileName}`), 'utf-8', (err, data) => err? console.error(err): res.send({'userString': helpers.getUserString(userName, req, res), 'type':'code', 'data':data}));
  // else res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native',  'data':`File with name ${fileName} not found`});
}


module.exports = cat;
