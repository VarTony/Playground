const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cd = (req, res, newPartPath = 'r00t1115') => {

  if(newPartPath === '../') {
    pwd.rewrite(req, res);
    return;
  }
  if(newPartPath === 'r00t1115') {
    pwd.rewrite(req, res, true);
    return;
  }

  let pwdPath = pwd.read()();

  fs.readdir(helpers.creatorPath(),  (err, filenames) => {
    if(err) {
      console.error(err);
      return;
    }
    // console.log('filenames : ', filenames.join(' '), 'newPartPath : ', newPartPath);
    // const validNewPath =  filenames.filter(filename => filename === newPartPath)[0]? true: false;
    // const isDirectory = validNewPath? fs.statSync(`${helpers.creatorPath()}${newPartPath}/`).isDirectory() : false;
    // const isDirectory=false;
    // console.log('stats : ', fs.statSync(`${helpers.creatorPath()}${newPartPath}/`).isFile());

    fs.stat(`${helpers.creatorPath()}${newPartPath}/`, (err, stat) => {
      if(err) {
        console.error(err);
        res.send(`Path ${newPartPath} not found or not directory`);
      }else {
        pwdPath = `${pwdPath}${newPartPath}/`;
        pwd.write(pwdPath);
        res.send('');
      }
    });


    // console.log(validNewPath);
    // if(isDirectory){
    //   pwdPath = `${pwdPath}${newPartPath}/`;
    //   pwd.write(pwdPath);
    //   // res.send(pwdPath);
    //   res.send('');
    //   return;
    // }
    // res.send(`Path ${newPartPath} not found`);
  });

}

module.exports = cd;
