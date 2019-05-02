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
			<main className='formBlock'> 
			<BlockForGID sendImg={this.sendImg}/>
			<BlockForContact img={this.state.contactImg} componentDidMount={this.props.componentDidMount} />			
			</main>
			);
	}
}

export default ContactCreater;