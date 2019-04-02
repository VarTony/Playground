import React from 'react'



class CreateBtn extends React.Component {

	constructor(props) {
        super(props);
	}

	render() {

		return (
			<button id="CreateBtn" className='btns' onClick={() => this.props.sendForm('/createContact')}>Create Contact</button> 
		);
	}
}

export default CreateBtn;