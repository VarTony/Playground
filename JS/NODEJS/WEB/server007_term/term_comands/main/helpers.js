const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');


const creatorPath = userName =>  pwd.read()(userName) === '.'? path.join(__dirname,  `../../users/${searchUserDir(userName)}`):  path.join(__dirname, `../../users/${searchUserDir(userName)}/${pwd.read()(userName)}`);


const getUserString = (userName, req, res) => {
  let cookie = req.headers.cookie.split('=')[1].split('-')[0];
  let userPath = pwd.read()(userName);
  return `${cookie}:~${userPath}$`;
}


const pathHandler = (userName, req, res, path) => {
  const pathsForHandler = {
    '../' : () => pwd.rewrite(userName, req, res),
    '/' : () => res.send({'userString': getUserString(userName, req, res), 'type':'native', 'data':''}),
    'r00t1115' : () => pwd.rewrite(userName, req, res, true)
  }
  if(pathsForHandler[path]) {
    pathsForHandler[path]();
    return true;
  }
  return false;
}


const checkFileExist = (userName, folderPath, fileName) => {
  let data = fs.readdirSync(path.join(__dirname, `../../users/${userName}${folderPath}`));
  return data.filter(file => fileName === file)[0]? true : false;
}

const searchUserDir = userId => {
  if(!userId) return userId;
  if(userId.split('|')[1]) return userId;
  const userDir = fs.readdirSync(path.join(__dirname, '../../users')).filter(dirName => dirName.split('|')[0] === userId);
  return userDir[0];
}



module.exports.creatorPath = creatorPath;
module.exports.pathHandler = pathHandler;
module.exports.checkFileExist = checkFileExist;
module.exports.getUserString  = getUserString;
module.exports.searchUserDir = searchUserDir;
