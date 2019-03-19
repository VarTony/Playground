import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Canvas from './Canvas';
import Controlers from './Controlers';
// import PaintScript from '../scripts/Paint.js';


class Paint extends Component {

	giveValues(e) {

		const { name, value } = e.target;
        this.setState({
          [name]: value
        });

	}

	render () {
		return (
			<div id='paint'>
				<Controlers />
				<Canvas/>
			 </div>
			);
	}
}

export default Paint;