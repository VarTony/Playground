const path = require('path');
const fs = require('fs');

const pwdRead = (client=false) => (req=null, res=null) => {
  let pwdPath = fs.readFileSync(path.join(__dirname, './.pwd'), 'utf-8');
  pwdPath = pwdPath.split('/').filter(char => char !== '\n').join('/');
  // console.log('pwdPath read', pwdPath);
  if(client) res.send(pwdPath);
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
    res.send('');
    return;
  }

  let pwd = pwdRead()();
  // console.log('pwd.split("/")', pwd.split('/'))
  pwd = pwd.split('/');
  pwd = pwd.splice(0, (pwd.length-2)).join('/') + '/';
  // console.log('rewrited : ', pwd);
  pwdWrite(pwd);
  // res.send(pwd);
  res.send('');
  return;
}

module.exports.read = pwdRead;
module.exports.write = pwdWrite;
module.exports.rewrite = pwdRewrite;
