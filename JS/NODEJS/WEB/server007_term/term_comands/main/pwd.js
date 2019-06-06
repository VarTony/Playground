const path = require('path');
const fs = require('fs');

const pwdRead = (client=false) => (req=null, res=null) => {
  let pwdPath = fs.readFileSync(path.join(__dirname, './.pwd'), 'utf-8');
  pwdPath = pwdPath.split('/').filter(char => char !== '\n').join('/');
  if(client) res.send({'type':'data', 'data':pwdPath});
  else return pwdPath; //.split('\n')[0]
}


const pwdWrite = data => {
  console.log('data : ', data);
  fs.writeFile(path.join(__dirname, './.pwd'), data, err => err? console.error(err): console.log('pwd updated'));
  return;
}


const pwdRewrite = (req, res, full=false) => {
  if(full) {
    pwdWrite('/')
    res.send({'type':'native', 'data':''});
    return;
  }


  let pwd = pwdRead()();
  pwd = pwd.split('/');
  pwd = pwd.splice(0, (pwd.length-2)).join('/') + '/';
  pwdWrite(pwd);
  res.send({'type':'native', 'data':''});
  return;
}

module.exports.read = pwdRead;
module.exports.write = pwdWrite;
module.exports.rewrite = pwdRewrite;
