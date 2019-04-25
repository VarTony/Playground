import React from 'react'



class UpdateBtn extends React.Component {

	constructor(props) {
        super(props);
	}

	render() {

		return (
			<button id="UpdateBtn" className='btns' onClick={() => this.props.sendForm('/UpdateContact')}>Update Contact</button> 
		);
	}
}

export default UpdateBtn;