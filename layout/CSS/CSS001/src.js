const input = document.querySelector('#input');
const before = document.querySelector('#before');
const after = document.querySelector('#after');
const canvas = document.querySelector('canvas');
canvas.style.width = document.body.offsetWidth + 'px';
canvas.style.height = document.body.offsetHeight + 'px';
console.log(canvas.style.width, canvas.style.height);
const ctx = canvas.getContext('2d');
const jsRandom = (max, min) => Math.random() * (max - min) + min;

let inputRDA = {x : input.offsetLeft + input.offsetWidth, y : input.offsetTop + input.offsetHeight};
let beforeLDA = {x : before.offsetLeft, y : before.offsetTop};
let afterRTA = {x : after.offsetLeft, y : after.offsetTop}
let randBeforeX = jsRandom(before.offsetWidth, beforeLDA.x);
let randinputX = jsRandom(input.offsetWidth, input.offsetLeft);
let randBeforeY = jsRandom(beforeLDA.y + before.offsetHeight, beforeLDA.y);
let randAfterY = jsRandom(afterRTA.y + after.offsetHeight, afterRTA.y);


const strokeMaker = (startPoint, finalPoint, color = 'black', beginPath = false, lineCap = 'round') => {
	if(beginPath) ctx.beginPath();
	ctx.lineCap = lineCap;
	ctx.strokeStyle = color;
	ctx.lineWidth = '2.3';
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(finalPoint.x, finalPoint.y);
	ctx.stroke();
}

strokeMaker( {x : randinputX, y : inputRDA.y}, {x : randBeforeX, y : beforeLDA.y});
strokeMaker( {x: beforeLDA.x + before.offsetWidth , y: randBeforeY}, {x: afterRTA.x, y: randAfterY});

console.log(afterRTA);
console.log(inputRDA);
console.log(input.offsetTop);
console.log(beforeLDA);