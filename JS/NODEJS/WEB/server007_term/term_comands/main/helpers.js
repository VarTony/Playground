const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');


const creatorPath = () =>  pwd.read()() === '.'? __dirname :  path.join(__dirname, pwd.read()());


const pathHandler = (req, res, path) => {
  const pathsForHandler = {
    '../' : () => pwd.rewrite(req, res),
    '/' : () => res.send({'type':'native', 'data':''}),
    'r00t1115' : () => pwd.rewrite(req, res, true)
  }
  if(pathsForHandler[path]) {
    pathsForHandler[path]();
    return true;
  }
  return false;
}

const checkFileExist = (folderPath, fileName) => {
  let data = fs.readdirSync(path.join(__dirname, folderPath));
  return data.filter(file => fileName === file)[0]? true : false;
}



module.exports.creatorPath = creatorPath;
module.exports.pathHandler = pathHandler;
module.exports.checkFileExist = checkFileExist;
