const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const generator = document.querySelector('#generator');
let color = `#${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
let user = `id-${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
const random = (max, min) => Math.floor(Math.random() * (max - min) + min);
// const list = [];

const drawField = list => {
	ctx.clearRect(0,0, 280, 280);
	let i = j = 0;
	while(list.length-1 > i) {
		while(list[i].length-1 > j){
			if(list[i][j]) {
				ctx.fillStyle = color;
				ctx.fillRect(i * 35, j * 35, 35, 35);
			}
			j++;
		}
		j=0;
		i++;
	} console.log('draw');
}

const creatorField = (n,m,field = [], i = 0) => {
	if(!n) return false;
	if(field.length >= n) return field;
	field[i] = creatorField(m,0,[]);	
	return creatorField(n, m, field, ++i);
}

let fieldOfLife = creatorField(28, 28);

const generate = () => {
	generator.innerText = 'Reroll';
	color = `#${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
	fieldOfLife = fieldOfLife.map(value => value.map(value => value = false));
	let i = random(28 * 28, 0);
	while(i > 0) {
		i--;
		fieldOfLife[random(28, 0)][random(28, 0)] = true;
	}
	console.log('generate');
	drawField(fieldOfLife);
}




generator.onclick = generate;


