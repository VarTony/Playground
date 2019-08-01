import React, {Component} from 'react';
import  Controlers from './Controlers';


class Canvas extends Component   {

	constructor(props) {
        super(props);
        this.state = {
	  			tool : this.props.tool,
					count : 0
		}
	}



	componentDidMount() {

		const senderImgs = img => {
			let saveimg = JSON.stringify({data : img, count : this.state.count});
			xhttp.open('post', '/handlerImg', true); //handlerImg
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.send(saveimg);

			xhttp.onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200) {
					console.log(this.responseText);
					win.src = this.responseText;
					this.setState({
						count : +this.responseText.split('.')[0].split('img')[1] //test;
					});
			  }
			}
		}

		const win = document.querySelector('#win');

		const canvas = this.refs.canvas;
		const xhttp = new XMLHttpRequest();
		let action, ctx, img;
		let penPoints, penPointer;  			   		//Pen
		let offsetfeltTip, pointsfeltTip, buferfeltTip; //Brush
		let eraser = false;								//Eraser
		penPoints = new Array(this.props.sizebrash || 10);
		document.body.onload = () => {

		action = 'up';
      	ctx = canvas.getContext("2d");
      	// ctx.globalAlpha = 0.1;
      	pointsfeltTip = new Array();



      	}


    	canvas.onmousedown = e => {

    		e.stopPropagation();
    		console.log(this.props.tool)
    		console.log(this.props.sizetool)

    		////---------------------------feltTipDown--------------------///////////////
    		if(this.props.tool === 'feltTip') {
    			action = "down";
    			ctx.lineWidth = this.props.sizetool;
   				offsetfeltTip = 1000;
   				ctx.globalAlpha = 0.2;
   				ctx.shadowBlur = 8;
   				ctx.shadowColor = this.props.color;
   				ctx.shadowOffsetX = -offsetfeltTip;
   				eraser = false;
    			penPoints = new Array(this.props.sizetool || 10);
    			action = 'down';
   				ctx.strokeStyle = this.props.color;
   				penPoints[0] = [e.offsetX, e.offsetY]; //e.offsetY;
      			penPointer = 0;
    		}
    		////---------------------------------------------------------//////////////



    		////---------------------------EraserDown--------------------//////////////
    		if(this.props.tool === 'eraser') {
    			action = 'down';
    			eraser = true;
    		}
    		////---------------------------------------------------------//////////////



    		////-----------------------------PenDown --------------------//////////////
    		if(this.props.tool === 'pen'){
    			ctx.globalAlpha = 0.1;
    			ctx.shadowBlur = 0;
   				ctx.shadowOffsetX = 0;
   				ctx.lineWidth = 1;
    			eraser = false;
    			penPoints = new Array(this.props.sizetool || 10);
    			action = 'down';
   				ctx.strokeStyle = this.props.color;
   				penPoints[0] = [e.offsetX, e.offsetY]; //e.offsetY;
      			penPointer = 0;
      		}
      		////---------------------------------------------------------/////////////



   			canvas.onmousemove = e => {

   				e.stopPropagation();

   				////---------------------------BrushMove--------------------///////////////
    			if(this.props.tool === 'feltTip') {
    				if (action == "down") {

    				let nextpoint = penPointer + 1;
        				if (nextpoint > penPoints.length - 1) nextpoint = 0;
       					ctx.beginPath();
       					console.log(penPointer);
        				ctx.moveTo(penPoints[penPointer][0],penPoints[penPointer][1]);
        				ctx.lineTo(e.offsetX, e.offsetY);
        				if (penPoints[nextpoint]) {
          					ctx.moveTo(penPoints[nextpoint][0] + Math.round(Math.random()*10-5), penPoints[nextpoint][1] + Math.round(Math.random()*10-5));
          					ctx.lineTo(e.offsetX, e.offsetY);
        				}
        				ctx.stroke();
        				penPointer = nextpoint;
        				penPoints[penPointer] = [e.offsetX, e.offsetY];
   					}
    			}
    			////---------------------------------------------------------//////////////



   				////---------------------------EraserMove--------------------///////////////////////////////////////////////////////////////////////////////////
   				if(eraser && action === 'down') ctx.clearRect(e.offsetX, e.offsetY, (this.props.sizebrash || 10), (this.props.sizebrash || 10));
				///--------------------------------------------------------------------------------------------------------------///////////////////////////////



				////-----------------------------PenMove --------------------///////////////////////////////////////////////////////////////////////////////////
				if(this.props.tool === 'pen'){
					if(action === 'down') {
						console.log(penPoints.length);
						let nextpoint = penPointer + 1;
        				if (nextpoint > penPoints.length - 1) nextpoint = 0;
       					ctx.beginPath();
       					console.log(penPointer);
        				ctx.moveTo(penPoints[penPointer][0],penPoints[penPointer][1]);
        				ctx.lineTo(e.offsetX, e.offsetY);
        				if (penPoints[nextpoint]) {
          					ctx.moveTo(penPoints[nextpoint][0] + Math.round(Math.random()*10-5), penPoints[nextpoint][1] + Math.round(Math.random()*10-5));
          					ctx.lineTo(e.offsetX, e.offsetY);
        				}
        				ctx.stroke();
        				penPointer = nextpoint;
        				penPoints[penPointer] = [e.offsetX, e.offsetY];
					}
				}
    			///--------------------------------------------------------------------------------------------------------------//////////////////////////////////////////////////

			}


			canvas.onmouseup = e => {

				e.stopPropagation();

				////---------------------------FeltTipUp-----------------------///////////////
    			if(this.props.tool === 'feltTip') {
    				action = "up";
					penPoints = new Array(this.props.sizetool || 10);
					img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
					senderImgs(img); //, imageElm

    			}
    			////---------------------------------------------------------//////////////




				////---------------------------EraserUp--------------------//////////////
				if(this.props.tool === 'eraser'){
					action = 'up';
					img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
					senderImgs(img); //, imageElm
					// canvas.onmousemove = null;
				}
				////-------------------------------------------------------//////////////



				////---------------------------PenUp-----------------------//////////////
				if(this.props.tool === 'pen'){
					action = 'up';
					penPoints = new Array(this.props.sizetool || 10);
					img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
					senderImgs(img); //, imageElm

			}
				////-------------------------------------------------------//////////////
			}
		}
  	}


// width={1000} height={650}
	render () {
		return (
			<canvas ref="canvas" id='canvasOfPaint' width={1000} height={800} ></canvas>
			);
	}
}


export default Canvas;
