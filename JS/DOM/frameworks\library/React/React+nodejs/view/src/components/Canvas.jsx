import React, {Component} from 'react';
// import * as CAV from './Controlers'; //controlers and them values
import  Controlers from './Controlers';

class Canvas extends Component   {

	constructor(props) {
        super(props);
        this.state = {
	  	tool : this.props.tool
	  }
	}


	

	componentDidMount() {

		const canvas = this.refs.canvas;
		let action, ctx, points, pointer;
		points = new Array(this.props.sizebrash || 10);
		document.body.onload = () => {
			
			action = 'up';
      		ctx = canvas.getContext("2d");
      		ctx.globalAlpha = 0.1;
			if(this.props.tool === 'pen'){
      			//this.props.color; #2d36a5'
      			pointer = 0;
      		}
      	}
    	canvas.onmousedown = e => {
    		console.log(this.props.tool)
    		console.log(this.props.sizebrash)
    		if(this.props.tool === 'pen'){
    			points = new Array(this.props.sizebrash || 10);
    			action = 'down';
   				ctx.strokeStyle = this.props.color;
   				points[0] = [e.offsetX, e.offsetY]; //e.offsetY;
      			pointer = 0;
      		}
   				canvas.onmousemove = e => {		
				// PenM(e);
				if(this.props.tool === 'pen'){
					if(action === 'down') {
						console.log(points.length);
						let nextpoint = pointer + 1;
        				if (nextpoint > points.length - 1) nextpoint = 0;
       					ctx.beginPath();
       					console.log(points, pointer);
        				ctx.moveTo(points[pointer][0],points[pointer][1]);
        				ctx.lineTo(e.offsetX, e.offsetY);
        				if (points[nextpoint]) { 
          					ctx.moveTo(points[nextpoint][0] + Math.round(Math.random()*10-5),points[nextpoint][1] + Math.round(Math.random()*10-5));
          					ctx.lineTo(e.offsetX, e.offsetY);
        				}
        				ctx.stroke();
        				pointer = nextpoint;
        				points[pointer] = [e.offsetX, e.offsetY]; 
			}
		}
    ///////////////////////////////////////

				// let x = e.offsetX;
				// let y = e.offsetY;
				// ctx.fillStyle = this.props.color;
				// clsearRect(x, y, width, height) eraser
				// ctx.fillRect(x-5, y-5, 10, 10); //this.props.bs brush
			}
			canvas.onmouseup = e => {
				if(this.props.tool === 'pen'){
					action = 'up';
					points = new Array(this.props.sizebrash || 10);
				}
			}
	// canvas.onmouseup = () => canvas.onmousemove = null; action = 'up';
	}

  }


	render () {
		return (
			<canvas ref="canvas" id='canvas' width={1000} height={650}></canvas>
			);
	}
}


export default Canvas;