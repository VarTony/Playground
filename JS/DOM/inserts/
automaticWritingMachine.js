const wall = document.querySelector('div');
let charRand = 0;

 const awm =  setInterval (() => {
	charRand = Math.floor(Math.random() * (150 - 1)) + 1;
	console.log(charRand);
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
