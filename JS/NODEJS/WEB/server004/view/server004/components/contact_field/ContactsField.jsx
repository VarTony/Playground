import React from 'react';
import Contact from './Contact';

class ContactsField extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}
	}


	render() {
		const contacts = this.props.data.map(data => <Contact data={data} key={data.id}/>);
		return(
			<div id='ContactsField'> 
				{contacts}
			</div>);
	}
}

export default ContactsField;
