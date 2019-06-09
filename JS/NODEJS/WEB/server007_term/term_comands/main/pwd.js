const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

const pwdRead = (client=false) => (userName, req=null, res=null) => {
  let pwdPath = fs.readFileSync(path.join(__dirname, `../../users/${userName}/original_system_files/.pwd`), 'utf-8');
  console.log('pwdPath1', `|${pwdPath}|`);
  pwdPath = pwdPath.split('/').filter(char => char !== '\n').join('/') //pwdPath[0] !== '/'? : pwdPath;
  console.log('pwdPath2', pwdPath);
  if(client) res.send({'userString': helpers.getUserString(userName, req, res), 'type':'data', 'data':pwdPath});
  else return pwdPath;
}


const pwdWrite = (userName, req, res, data) => {
  console.log('data : ', data);
  fs.writeFile(path.join(__dirname, `../../users/${userName}/original_system_files/.pwd`), data, err => err? console.error(err): res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native', 'data':''})); //console.log('pwd updated')
  return;
}


const pwdRewrite = (userName, req, res, full=false) => {
  if(full) {
    pwdWrite(userName, req, res, '/')
    return;
  }

  let pwd = pwdRead()(userName);
  pwd = pwd.split('/');
  pwd = pwd.splice(0, (pwd.length-2)).join('/') + '/';
  pwdWrite(userName, req, res, pwd);
  return;
}

module.exports.read = pwdRead;
module.exports.write = pwdWrite;
module.exports.rewrite = pwdRewrite;
