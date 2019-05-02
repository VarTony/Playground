import React from 'react';
import Contact from './Contact';

class ContactsField extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		const contacts = this.props.data.map(data =>{
		 
		 		let randIndent = Math.floor(Math.random() * (3 - 0)) + 0;
		 		const alignSelfParams = ['flex-start', 'center', 'flex-end'];
		 		let styles = {
		 			alignSelf : alignSelfParams[randIndent]
		 		}
		 		console.log(alignSelfParams[randIndent], randIndent)
		 		return (
		 			<div className='contacts' style={styles} key={data.id}> 
		 				<Contact 
		 				 data={data} 
		 				 updateContactGetMethod={this.props.updateContactGetMethod}
		 				 componentDidMount={this.props.componentDidMount}
		 				/> 
		 			</div>)
			});
		
		return(
			<div id='ContactsField'> 
				{contacts}
			</div>);
	}
}

export default ContactsField;
