// const fs = require('fs');
// const path = require('path');

const checknPhoneValid = number => {
	let ints = number.split('').filter(int => Number(int) !== NaN);
	console.log(ints.length >= 10 && 15 >= ints.length);
	return ints.length >= 10 && 15 >= ints.length;
}


const charsControler = (char) => {
	const stopChars = ['$', '{', '}', '[', ']', '\\', '<', '/', '>', '#', '%', '`', '\'', '"'];
	let i = 0;
	while(stopChars.length -1 >= i) {
		if(stopChars[i] === char) return false;
		i++;
	}
	return true;
}

const formDataValidator = form => {
	for(let key in form) form[key] = form[key].split('').filter(char => charsControler(char)).join('');
}


const checkEmailValid = email => {
	let requiredСhars = email.split('').filter(char  => char === '@' || char === '.')
	console.log(requiredСhars);
	return requiredСhars.length >= 2 && requiredСhars[1] === '.';
}

module.exports.checknPhoneValid = checknPhoneValid;
module.exports.checkEmailValid = checkEmailValid;
module.exports.formDataValidator = formDataValidator;
