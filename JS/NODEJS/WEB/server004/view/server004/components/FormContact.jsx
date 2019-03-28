import React, {Component} from 'react';

class FormContact extends Component {

	constructor(props) {
        super(props);
        this.state = {
	  	tool : this.props.tool
	  }
	}





	render() {

		return(

			<form id='FormContact'> 
				<input type='number' name='number' id='number' placeholder='Number phone' />
				<input type='name' name='name' id='name' placeholder='Name' />
				<input type='lastname' name='lastname' id='lastname' placeholder='Last name' />
				<input type='email' name='email' id='email' placeholder='Email' />
			</form>

			);
}


}

export default FormContact;