const fs = require('fs');
const path = require('path');
// const sqlite3 = require('sqlite3').verbose();

let timeDbChanged = false;

const checknPhoneValid = number => {
	let ints = number.split('').filter(int => Number(int) !== NaN);
	console.log(ints.length >= 10 && 15 >= ints.length);
	return ints.length >= 10 && 15 >= ints.length;
}


const checkEmailValid = email => {
	let requiredСhars = email.split('').filter(char  => char === '@' || char === '.')
	console.log(requiredСhars);
	return requiredСhars.length >= 2 && requiredСhars[1] === '.'; 
}

module.exports.checknPhoneValid = checknPhoneValid;
module.exports.checkEmailValid = checkEmailValid;