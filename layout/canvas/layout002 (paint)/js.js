const canvas = document.getElementById('c1');
const color = document.getElementById('color');
const ctx = canvas.getContext('2d');

canvas.onmousedown = e => {
	canvas.onmousemove = e => {		
		let x = e.offsetX;
		let y = e.offsetY;
		ctx.fillStyle = color.value;
		ctx.fillRect(x-5, y-5, 10, 10);
			
		}
	canvas.onmouseup = () => canvas.onmousemove = null;
	}
