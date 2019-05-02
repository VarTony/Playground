import React from 'react';

class BtnNext extends React.Component {

	constructor(props) {
		super(props);
	}



	render() {
		return(
			<input type='image' id='btnNext' onClick={() => this.props.scrollContactField('next')}  src='./imgs/arrows/next.png'/>
			);
	}
}


export default BtnNext;