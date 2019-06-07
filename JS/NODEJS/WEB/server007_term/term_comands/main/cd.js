const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cd = (req, res, newPartPath = 'r00t1115') => {
  const processed = helpers.pathHandler(req, res ,newPartPath);

  if(!processed) {
    let pwdPath = pwd.read()();
    fs.readdir(helpers.creatorPath(),  (err, filenames) => {
      if(err) {
        console.error(err);
        return;
      }

      fs.stat(`${helpers.creatorPath()}${newPartPath}/`, (err, stat) => {
        if(err) {
          console.error(err);
          res.send({'userString': helpers.getUserString(req, res), 'type':'native', 'data':`Path ${newPartPath} not found or not directory`});
        }else {
          pwdPath = `${pwdPath}${newPartPath}/`;
          pwd.write(req, res, pwdPath);
          return;
          // res.send({'userString': helpers.getUserString(req, res), 'type':'native', 'data':''});
        }
      });
    });
  }
}

module.exports = cd;
