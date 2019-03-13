const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const widthDoc = document.body.offsetWidth;
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
canvas.width = widthDoc;

let color = document.querySelector('#color');

let R, r, d, timer, widthTassel, speed;
let teta = 0;
let nonstop = true;

const spiro = () => {
	R = document.querySelector('#R').value * 1;
	r = document.querySelector('#r').value * 1;
	d = document.querySelector('#d').value * 1;
	speed = document.querySelector('#speed').value * 1;
	widthTassel = document.querySelector('#widthTassel').value * 1;
	console.log(speed);
	let x = (R-r) * Math.cos(teta) + d * Math.cos((R-r) * teta/r);
	let y = (R-r) * Math.sin(teta) + d * Math.sin((R-r) * teta/r);
	teta += 0.01;
	ctx.fillStyle = color.value;
	ctx.fillRect(500+x, 512+y, widthTassel, widthTassel);
	if(nonstop) timer = setTimeout(spiro, speed);
}

start.onclick = () =>{
	nonstop = true;
	spiro();

};
stop.onclick = () => nonstop = !nonstop;
// spiro();