const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const start = document.querySelector('#start');

const drawField = list => {
	ctx.clearRect(0,0, 1000, 800);
	let i = j = 0;
	while(list.length-1 > i) {
		while(list[i].length-1 > j){
			if(list[i][j]) {
				ctx.fillStyle = '#41bf86';
				// ctx.fillStyle = `#${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
				ctx.fillRect(i * 10, j * 10, 10, 10);
				// ctx.fillRect(i, j, 1, 1);
			}
			j++;
		}
		j=0;
		i++;
	}
}

const creatorField = (n,m,field = [], i = 0) => {

	if(!n) return false;
	if(field.length >= n) return field;
	field[i] = creatorField(m,0,[]);
	
	return creatorField(n, m, field, ++i);
}

let fieldOfLife = creatorField(100, 80);
// let fieldOfLife = creatorField(1000, 800);
canvas.onclick = e => {

	let x = e.offsetX;
	let y = e.offsetY;

	// x = Math.floor(x);
	// y = Math.floor(y);
	x = Math.floor(x/10);
	y = Math.floor(y/10);
	fieldOfLife[x][y] = true;
	console.log(x,y);
	// ctx.fillStyle = '#ffffff';
	// ctx.fillRect(x,y,10,10)
	drawField(fieldOfLife);
}

const fpm = i => i === 0 ? 30: i; 
const fpp = j => j === 0 ? -1: j;
const startLife = () => {
	let i = j = 0;
	while(fieldOfLife.length-1 > i) {
		while(fieldOfLife[i].length-1 > j){
			let neighborhoods = 0;
			if(fieldOfLife[fpm(i) - 1][j]) neighborhoods++;
			if(fieldOfLife[i][fpp(j) + 1]) neighborhoods++;
			if(fieldOfLife[fpp(i) + 1][j]) neighborhoods++;
			if(fieldOfLife[i][fpm(j) - 1]) neighborhoods++;
			if(fieldOfLife[fpm(i) - 1][[fpp(j) + 1]]) neighborhoods++;
			if(fieldOfLife[fpm(i) - 1][[fpm(j) - 1]]) neighborhoods++;
			if(fieldOfLife[fpp(i) + 1][[fpp(j) + 1]]) neighborhoods++;
			if(fieldOfLife[fpp(i) + 1][[fpm(j) - 1]]) neighborhoods++;
			fieldOfLife[i][j] = (neighborhoods >= 2 && neighborhoods <= 3) ? true : false;
			if(neighborhoods > 3){
			 	fieldOfLife[i][j] = false;
			 	fieldOfLife[fpm(i) - 1][[fpp(j) + 1]] = false;
			 	fieldOfLife[fpm(i) - 1][j] = false;
			 	// fieldOfLife[i][fpm(j) - 1] = false;
			if(neighborhoods < 2){
				fieldOfLife[i][j] = false;
			 	fieldOfLife[fpp(i) + 1][[fpp(j) + 1]] = false;
			 	fieldOfLife[fpp(i) + 1][[fpm(j) - 1]] = false;
			}
			}
			j++;
		}
		j=0;
		i++;
	}
	drawField(fieldOfLife);
	setTimeout(startLife, 256);
}

// const timer = () => setTimeout(startLife, 500);
start.onclick = startLife;
// startLife();

