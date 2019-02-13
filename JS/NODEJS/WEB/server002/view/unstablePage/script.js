

const link = document.querySelector('head link');
				    //||\\
const title = document.querySelector('title');

let timeBreak = Math.floor(Math.random() * (15000 - 1000) + 1000);
const randFunk = ( max = 35000, min = 1000) =>  timeBreak = Math.floor(Math.random() * (max - min) + min);
const breakS = () => setTimeout(breakStyle ,timeBreak);

breakS();

function normaliseStyle () {

	title.innerText = 'Document';
	link.href = './style.css'
	randFunk();
	breakS();
}

function breakStyle() {
	title.innerText = 'Tnemucod';
	link.href = './style2.css';
	setTimeout(normaliseStyle, 550);
}

