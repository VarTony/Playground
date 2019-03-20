import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Canvas from './Canvas';
import Controlers from './Controlers';
// import PaintScript from '../scripts/Paint.js';


class Paint extends Component {
	constructor(props) {
        super(props);
        this.state = {
	  	color : 'black',
	  	sizebrash : 10,
	  	tool : 'brush',
	  	filldrip : false 
	  }
	   this.takeBrushModel = this.takeBrushModel.bind(this);
	   this.takeValues = this.takeValues.bind(this);
	   this.takeSizebrash = this.takeSizebrash.bind(this);
}
	
	takeBrushModel(e) {
		this.setState({
			tool : e.target.getAttribute('name')
		});
	}

	takeSizebrash(e) {
		console.log(e.target.getAttribute('name') * 1);
		this.setState({
			sizebrash : (e.target.getAttribute('name') * 1)
		});
	}


	takeValues(e) {
		const { name, value } = e.target;;
        this.setState({
          [name]: value
        });

	}

	render () {
		return (
			<div id='paint'>
				<Controlers 
					takeValues={this.takeValues}  
					takeBrushModel={this.takeBrushModel} 
					takeSizebrash={this.takeSizebrash}
				/>
				
				<Canvas
					color={this.state.color}
					tool={this.state.tool}
					sizebrash={this.state.sizebrash}
				/>
			 </div>
			);
	}
}

export default Paint;