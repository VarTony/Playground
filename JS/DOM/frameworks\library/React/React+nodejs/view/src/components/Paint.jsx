import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Canvas from './Canvas';
import Controlers from './Controlers';


class Paint extends Component {

	render () {
		return (
			<div id='paint'>
				<Controlers/>
				<Canvas/>
			 </div>
			);
	}
}

export default Paint;