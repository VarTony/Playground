import React, {Component} from 'react';
import CreateBtn from './CreateBtn';

class BlockForContact extends Component {

	constructor(props) {
        super(props);
        this.state = {
	  	tool : this.props.tool
	  }
	}





	render() {

		return(
			<div id='BlockForContact'>
			<form id='FormContact'> 
				<fieldset>
					<input type='name' name='name' id='name' placeholder='First name' />
					<input type='lastname' name='lastname' id='lastname' placeholder='Last name' />
				</fieldset>
				<fieldset>
					<input type='number' name='number' id='number' placeholder='Number phone' />					
					<input type='email' name='email' id='email' placeholder='Email' />
				</fieldset>
			</form>
			<CreateBtn />
			</div>
			);
}


}

export default BlockForContact;