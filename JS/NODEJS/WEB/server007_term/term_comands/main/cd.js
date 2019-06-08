const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');
const helpers = require('./helpers');

const cd = (userName, req, res, newPartPath = 'r00t1115') => {
  const processed = helpers.pathHandler(userName, req, res, newPartPath);

  if(!processed) {
    let pwdPath = pwd.read()(userName);
    fs.readdir(helpers.creatorPath(userName),  (err, filenames) => {
      if(err) {
        console.error(err);
        return;
      }

      fs.stat(`${helpers.creatorPath(userName)}${newPartPath}/`, (err, stat) => {
        if(err) {
          console.error(err);
          res.send({'userString': helpers.getUserString(userName, req, res), 'type':'native', 'data':`Path ${newPartPath} not found or not directory`});
        }else {
          pwdPath = `${pwdPath}${newPartPath}/`;
          pwd.write(userName, req, res, pwdPath);
          return;
        }
      });
    });
  }
}

module.exports = cd;
