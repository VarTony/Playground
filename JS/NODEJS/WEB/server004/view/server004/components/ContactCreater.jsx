import React, {Component} from 'react';
import BlockForContact from './BlockForContact';
import BlockForGID from './BlockForGID';



class ContactCreater extends Component {

	constructor(props) {
        super(props);
	
		this.state = {
		contactImg : ''
		}
	this.sendImg = this.sendImg.bind(this)
	}

	sendImg (img) {

		this.setState({
			contactImg : img 
		});
	}

	render() {
		return(
			<main id='ContactCreater'> 
			<BlockForGID sendImg={this.sendImg}/>
			<BlockForContact img={this.state.contactImg} giveDataFromForm={this.props.giveDataFromForm} />			
			</main>
			);
	}
}

export default ContactCreater;