const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const PI = Math.PI;
const color = document.querySelector('#color');
console.log(color.value);
color.onchange = e => { 
	ctx.strokeStyle = color.value;
	ctx.arc(150, 100, 75, 0, PI * 2, false);
	ctx.stroke();
}

//ctx.arc(x,y,radius, angle_start, angle_end, anticlockwise); angle - radian
ctx.clearRect(0, 0, 400, 200);

canvas.onmousemove = e => {
	ctx.strokeStyle = color.value;
	let x = e.offsetX;
	let y = e.offsetY;
	let radius = (((x-200) ** 2) + ((y - 200) ** 2)) ** 0.5;  
	ctx.arc(200, 100, radius, 0, PI * 2, false);
	ctx.stroke();

}