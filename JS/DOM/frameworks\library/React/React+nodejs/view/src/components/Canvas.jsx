import React, {Component} from 'react';
// import * as CAV from './Controlers'; //controlers and them values
import  Controlers from './Controlers';

class Canvas extends Component   {
	// moveBrush (e) {
	// 	this.canvas.onmousemove = e => {		
	// 		let x = e.offsetX;
	// 		let y = e.offsetY;
	// 		this.ctx.fillStyle = this.color.value;
	// 		this.ctx.fillRect(x-5, y-5, 10, 10);
	// 			}

	// stopMoveBrush = () => this.canvas.onmousemove = null;
	// }

	 componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    canvas.onmousedown = e => {
   		canvas.onmousemove = e => {		
				let x = e.offsetX;
				let y = e.offsetY;
				ctx.fillStyle = this.state.color;
				ctx.fillRect(x-5, y-5, 10, 10);
		}
	canvas.onmouseup = () => canvas.onmousemove = null;
	}

  }


	render () {
		return (
			<canvas ref="canvas" id='canvas' width={1000} height={650}></canvas>
			);
	}
}


export default Canvas;