import React from 'react';

class BtnPrevious extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<input type='image' id='btnPrevious' onClick={() => this.props.scrollContactField('previous')}   src='./imgs/arrows/previous.png'/>
			);
	}
}


export default BtnPrevious;