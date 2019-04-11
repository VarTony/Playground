import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/ContactCreater';
import ContactsField from './components/contact_field/ContactsField';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			// dataFromForm : [],
			contacts : []
		}
		this.giveDataFromForm = this.giveDataFromForm.bind(this);
	}

	giveDataFromForm(data) {

		this.setState({
			dataFromForm : data
		})

	}

	componentDidMount() {
		console.log('here');
		fetch('/readContacts', {method: 'get',
			headers: {
				"Content-type": "application/json"
			},
		 })
			.then(res => res.json())
			.then(gotContacts => 
			this.setState({contacts : gotContacts}));
	}


	render() {
		return (
			<div>
				<ContactCreater giveDataFromForm = {this.giveDataFromForm} />
				<ContactsField  data={this.state.contacts}/>
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));