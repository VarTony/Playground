import React, {Component} from 'react';
import BlockForContact from './BlockForContact';
import BlockForGID from './BlockForGID';



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
			<BlockForGID/>
			<BlockForContact />			
			</main>
			);
	}
}

export default ContactCreater;