import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Canvas from './Canvas';
import Controlers from './Controlers';
// import PaintScript from '../scripts/Paint.js';


class Paint extends Component {
	constructor(props) {
        super(props);
        this.state = {
	  	color : '#2d36a5',
	  	sizetool : 10,
	  	tool : 'feltTip',
	  	filldrip : false 
	  }
	   this.takeBrushModel = this.takeBrushModel.bind(this);
	   this.takeValues = this.takeValues.bind(this);
	   this.takeSizetool = this.takeSizetool.bind(this);
}
	
	takeBrushModel(e) {
		this.setState({
			tool : e.target.getAttribute('name')
		});
	}

	takeSizetool(e) {
		console.log(e.target.getAttribute('name') * 1);
		this.setState({
			sizetool : (e.target.getAttribute('name') * 1)
		});
	}


	takeValues(e) {
		const { name, value } = e.target;  
        this.setState({
          [name]: value,
        });

	}


	mover(e){
		const paint = document.querySelector('#paint')
		let timeOfClick = performance.now();
  		paint.style.position = 'absolute';
  		moveAt(e);
  		document.body.appendChild(paint);
  		paint.style.zIndex = 500; 

  		function moveAt(e) {
  			// console.log(childPos);
   			paint.style.left = e.pageX - 10 + 'px'; //- paint.offsetWidth / 3   e.offsetX, e.offsetY
    		paint.style.top = e.pageY - 10 + 'px'; //- paint.offsetHeight / 2
  		}

  		console.log('const contex = {block};');
  		document.onmousemove = e => moveAt(e);
  		paint.onmouseup = () => {
    		timeOfClick = performance.now() - timeOfClick;

    		document.onmousemove = null;
    		paint.onmouseup = null;
  		}

	}



	render () {
		return (
			<div id='paint'  onMouseDown={this.mover}>
				<Controlers 
					color={this.state.color}
					takeValues={this.takeValues}  
					takeBrushModel={this.takeBrushModel} 
					takeSizetool={this.takeSizetool}
				/>
				
				<Canvas
					color={this.state.color}
					tool={this.state.tool}
					sizetool={this.state.sizetool}
				/>
			 </div>
			);
	}
}

export default Paint;


//// root.onmousedown = (e) => f(e, root);
// blocks.forEach( block => block.onmousedown = (e) => f(e, block));
// console.log('ms.js')
// const f = (e, block)  => { 
//   let timeOfClick = performance.now();
//   block.style.position = 'absolute';
//   moveAt(e);
//   document.body.appendChild(block);
//   block.style.zIndex = 500; 

//   function moveAt(e) {
//     block.style.left = e.pageX - block.offsetWidth / 3 + 'px';
//     block.style.top = e.pageY - block.offsetHeight / 2 + 'px';
//   }
//   const contex = {block};
//   document.onmousemove = e => moveAt(e);
//   block.onmouseup = () => {
//     timeOfClick = performance.now() - timeOfClick;

//     document.onmousemove = null;
//     block.onmouseup = null;
//   }
// }
