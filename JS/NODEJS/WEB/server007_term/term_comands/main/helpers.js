const path = require('path');
const fs = require('fs');
const pwd = require('./pwd');

const creatorPath = () =>  pwd.read()() === '.'? __dirname :  path.join(__dirname, pwd.read()());

module.exports.creatorPath = creatorPath;
