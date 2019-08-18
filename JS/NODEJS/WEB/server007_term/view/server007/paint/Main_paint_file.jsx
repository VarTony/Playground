import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Canvas from './Components/Canvas';
import Controlers from './Components/Controlers';
import mover from './../viewHelpers.js';


class Paint extends Component {
	constructor(props) {
        super(props);
        this.state = {
	  			color : '#fff',
	  			sizetool : 5,
	  			tool : 'pen',
	  			filldrip : false,
					visible: this.props.visible
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

	componentWillReceiveProps(updatedProps) {
		this.setState({
				visible : updatedProps.visible
		});
	}


	render () {
		return (
			<div id='paint' className={this.state.visible ? 'visible': 'not_visible'} onMouseDown={(e) => mover(e, '#paint')}>
				<Controlers
					color={this.state.color}
					takeValues={this.takeValues}
					takeBrushModel={this.takeBrushModel}
					takeSizetool={this.takeSizetool}
					changePaintVisible={this.props.changePaintVisible}
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
