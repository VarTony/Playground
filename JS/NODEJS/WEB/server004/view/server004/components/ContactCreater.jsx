import React, {Component} from 'react';
import GIDCreator from './GIDCreator';
import FormContact from './FormContact';
import GenerateBtn from './GenerateBtn';
import CreateBtn from './CreateBtn';


class ContactCreater extends Component {

	constructor(props) {
        super(props);
        this.state = {
	  	tool : this.props.tool
	  }
	}



	render() {
		return(
			<main id='ContactCreater'> 
			<GIDCreator />
			<CreateBtn />
			<FormContact />
			<GenerateBtn />
			
			</main>
			);
	}
}

export default ContactCreater;