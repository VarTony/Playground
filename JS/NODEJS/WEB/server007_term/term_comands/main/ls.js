const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

const ls = (userName, req, res) => {
  userName = helpers.searchUserDir(userName);
  const dirpath = helpers.creatorPath(userName);
  const NameOfFile = [];
  fs.readdir(dirpath,  (err, filenames) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(filenames);
    const result = filenames.join(' \n ');
    res.send({'userString': helpers.getUserString(userName, req, res), 'type':'data', 'data':result});
  });
}
module.exports = ls;
