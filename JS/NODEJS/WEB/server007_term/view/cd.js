const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');

const cd = newPartPath => {
  fs.readdir(path.join(__dirname, pwd),  (err, filenames) => {
    if(err) {
      console.error(err);
      return;
    }
    const validNewPath =  filenames.filter(filename => filename === newPartPath);
    // console.log(filenames);
    if(validNewPath){
      validNewPath = validNewPath.map(fs.stat());
      console.log(validNewPath);
      pwd = path.join(pwd, newPath);
      res.send(pwd);
      return;
    }
    res.send(`Path ${newPath} not found`);
  });

}

module.exports = cd;
