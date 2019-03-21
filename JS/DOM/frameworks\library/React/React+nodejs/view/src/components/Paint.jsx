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

	render () {
		return (
			<div id='paint'>
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