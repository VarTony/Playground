import React from 'react';

class Flash extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			flashMsg : this.props.flashMsg
		} 
	}

	componentWillReceiveProps(updatedProps) {		
		console.log(updatedProps);
		this.setState({
			flashMsg : updatedProps.flashMsg.length < 128 ? updatedProps.flashMsg : 'Contact created', 		//flash.msg,
		});
	}


	render() {
		return(
			<div id='flash'> 
				<h3>{this.state.flashMsg}</h3>
			</div>
			);
	}
}

export default Flash;