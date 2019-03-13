const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
let stepCount = 0;
let x = 200;
let y = 100;
let timer, direction, conditionField;

const mySwitch = [
[() => y--], [() =>{x++;y--}],
[() => x++], [() =>{x++;y++}],
[() => y++], [() =>{x--;y++}],
[() => x--], [() =>{x--;y++}]];

const borderGuard = [
 [()=>x+=5], [()=>x-=5],
 [()=>y+=5], [()=>y-=5]];

const drawDot = () => {
	
	ctx.clearRect(0, 0, 400, 200);

	x<0? borderGuard[0][0]():
	x<0? borderGuard[1][0]():
	x>400? borderGuard[2][0]():
	y>200? borderGuard[3][0]():
	null;
	console.log(x,y);

	if(stepCount === 0) {

			stepCount = Math.floor(15 * Math.random());
			direction = Math.floor(8 * Math.random());
	}
	else stepCount--;
	ctx.fillRect(x-3,y-3,5,5);
	mySwitch[direction][0]();
	timer = setTimeout(drawDot, 50);
}

drawDot();