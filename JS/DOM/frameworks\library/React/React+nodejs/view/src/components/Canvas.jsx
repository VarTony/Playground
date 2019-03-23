import React, {Component} from 'react';
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
		const xhttp = new XMLHttpRequest();
		let action, ctx;
		let penPoints, penPointer;  			   		//Pen
		let offsetfeltTip, pointsfeltTip, buferfeltTip; 		//Brush
		let eraser = false;								//Eraser
		penPoints = new Array(this.props.sizebrash || 10);
		document.body.onload = () => {
			
		action = 'up';
      	ctx = canvas.getContext("2d");
      	// ctx.globalAlpha = 0.1;
      	pointsfeltTip = new Array();
			


			// if(this.props.tool === 'pen'){
   //    			//this.props.color; #2d36a5'
   //    			penPointer = 0;
   //    			alert('Onload')
   //    		}
      	


      	}


    	canvas.onmousedown = e => {
    		
    		console.log(this.props.tool)
    		console.log(this.props.sizetool)

    		////---------------------------feltTipDown--------------------///////////////
    		if(this.props.tool === 'feltTip') {  			
    			// ctx.strokeStyle = this.props.color;
    			action = "down";
   				// pointsBrush.push([e.pageX,e.pageY]);
    			ctx.lineWidth = this.props.sizetool;
   				//смещение (больше чем ширина канвы)
   				offsetfeltTip = 1000;
   				//параметры тени
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
   				//в буфере будем хранить растр канвы
   				// buferBrush = ctx.getImageData(0, 0, canvas.width, canvas.height);
    		}
    		////---------------------------------------------------------//////////////



    		////---------------------------EraserDown--------------------//////////////
    		if(this.props.tool === 'eraser') eraser = true;
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



   				////---------------------------BrushMove--------------------///////////////
    			if(this.props.tool === 'feltTip') {
    				if (action == "down") {
    					// ctx.putImageData(buferBrush,0,0);
    					// pointsBrush.push([e.offsetX, e.offsetY]);
    					// ctx.beginPath();
    					// ctx.moveTo(pointsBrush[0][0]+offsetBrush, pointsBrush[0][1]);
    					// for (let i = 1; i < pointsBrush.length; i++){
     				// 	ctx.lineTo(pointsBrush[i][0]+offsetBrush,pointsBrush[i][1]);
    				// }
    				// ctx.stroke();
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
   				if(eraser) ctx.clearRect(e.offsetX, e.offsetY, (this.props.sizebrash || 10), (this.props.sizebrash || 10));	
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

				// let x = e.offsetX;
				// let y = e.offsetY;
				// ctx.fillStyle = this.props.color;
				// clsearRect(x, y, width, height) eraser
				// ctx.fillRect(x-5, y-5, 10, 10); //this.props.bs brush
			}


			canvas.onmouseup = e => {



				////---------------------------BrushUp-----------------------///////////////
    			if(this.props.tool === 'feltTip') {
    				action = "up";
    				action = 'up';
					penPoints = new Array(this.props.sizetool || 10);
   					// pointsBrush = new Array();
   					// buferBrush = ctx.getImageData(0,0,canvas.width,canvas.height);	
    			}
    			////---------------------------------------------------------//////////////




				////---------------------------EraserUp--------------------//////////////
				if(this.props.tool === 'eraser') canvas.onmousemove = null;
				////-------------------------------------------------------//////////////



				////---------------------------PenUp-----------------------//////////////
				if(this.props.tool === 'pen'){
					action = 'up';
					penPoints = new Array(this.props.sizetool || 10);
					let img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
					let saveimg = JSON.stringify({data : img});
					xhttp.open('post', '/handlerImg', true); //handlerImg
					xhttp.setRequestHeader("Content-Type", "application/json");

					xhttp.send(saveimg);

					xhttp.onreadystatechange = function(){
						if(this.readyState === 4 && this.status === 200) {
							console.log(this.responseText);
							document.body.style.backgroundRepeat = "repeat-y";
							// document.body.style.backgroundRepeat = "repeat-x";
							document.body.style.backgroundImage = `url(${this.responseText})`;
							document.body.style.backgroundSize = "100%";

						} 
					}
				}
				////-------------------------------------------------------//////////////
			}
		}
  	}



	render () {
		return (
			<canvas ref="canvas" id='canvas' width={1000} height={650}></canvas>
			);
	}
}


export default Canvas;