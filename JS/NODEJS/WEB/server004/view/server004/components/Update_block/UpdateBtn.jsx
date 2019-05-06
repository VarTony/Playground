import React from 'react'



class UpdateBtn extends React.Component {

	constructor(props) {
        super(props);
	}

	render() {

		return (
			<button id="UpdateBtn" className='btns' onClick={() => this.props.updateForm(`/UpdateContact/${this.props.idContact}`)}>Update Contact</button> 
		);
	}
}

export default UpdateBtn;