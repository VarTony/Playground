import React, {Component} from 'react';


class GIDCreator extends Component   {

	constructor(props) {
        super(props);
	}

	componentDidMount() {
		const canvas = this.refs.GID;
		const ctx = canvas.getContext('2d');
		const generator = document.querySelector('#GenerateBtn');
		let color = `#${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
		let user = `id-${(Math.floor(Math.random() * (12131217 - 0)) + 0).toString(16)}`;
		const random = (max, min) => Math.floor(Math.random() * (max - min) + min);


		const drawField = list => {
			ctx.clearRect(0,0, 200, 200);
			let i = 0;
			let j = 0;
			while(list.length-1 > i) {
				while(list[i].length-1 > j){
					if(list[i][j]) {
						ctx.fillStyle = color;
						ctx.fillRect(i * 25, j * 25, 25, 25);
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

		let fieldOfLife = creatorField(20, 20);

		const generate = () => {
			generator.innerText = 'Reroll';
			color = `#${(Math.floor(Math.random() * (16777215 - 0)) + 0).toString(16)}`;
			fieldOfLife = fieldOfLife.map(value => value.map(value => value = false));
			let i = random(20 * 20, 0);
			while(i > 0) {
			i--;
			fieldOfLife[random(20, 0)][random(20, 0)] = true;
			const img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
			this.props.sendImg(img);
			}
		console.log('generate');
		drawField(fieldOfLife);
	}




generator.onclick = generate;

	}



	render () {
		return (
			<canvas ref="GID" id='GID' width={200} height={200}></canvas>
			);
	}
}


export default GIDCreator;
