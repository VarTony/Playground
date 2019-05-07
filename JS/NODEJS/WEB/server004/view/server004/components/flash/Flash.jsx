import React from 'react';

class Flash extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			flashMsg : this.props.flashMsg,
			visible : false
		}
	}

	componentWillReceiveProps(updatedProps) {
		// console.log(updatedProps, ' : updatedProps');		
		this.setState({
			flashMsg : updatedProps.flashMsg, 		//flash.msg,
			visible: true
		});

		setTimeout(() => this.setState({visible : false}), 5000);
	}

	render() {
		return(
			<div id='flash' className={this.state.visible? 'visible': 'hidden'}> 
				<h3>{this.state.flashMsg}</h3>
			</div>
			);
	}
}

export default Flash;


		// this.state = {
		// 	flashMsg : this.props.flash.msg,
		// 	visible : this.props.flash.visible
		// }