// import ajax from 'ajax.js';

const inputs = document.querySelectorAll('input');
let passwordField = emailField = submit = {};

inputs.forEach(elm => { 
	console.log(elm);
	if(elm.type === 'password') passwordField = elm;
	if(elm.type === 'email') emailField = elm;
	if(elm.type === 'submit')  submit = elm;
}); 


let password =  email = ''; 

submit.onclick = () => {
	let listOfData = new Map;
	password = passwordField.value;
	email = emailField.value;
	listOfData.set('email', email);
	listOfData.set('password', password);
	listOfData = helper(listOfData);
	console.log(listOfData);
	setTimeout(() =>{ 
		emailField.value = '';
		passwordField.value = '';
	},0)
	ajax('POST', listOfData);
}



const wall = document.querySelector('#wall');
let charRand = 0;

 const awm =  setInterval (() => {
	charRand = Math.floor(Math.random() * (150 - 1)) + 1;
	 wall.innerText += wall.innerText.length % 10 !== 0 && wall.innerText.length !== 1 ?
	   charRand % 3 === 0 ?
	     charRand.toString(32):
	     charRand.toString(16):
	    "\r\t" + charRand.toString(2)}, 50);


wall.onclick = () => clearInterval(awm);


function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}

pageScroll();

