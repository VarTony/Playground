import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/ContactCreater';
import ContactsField from './components/contact_field/ContactsField';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dataFromForm : []
		}
		this.giveDataFromForm = this.giveDataFromForm.bind(this);
	}

	giveDataFromForm(data) {

		this.setState({
			dataFromForm : data
		})

	}

	render() {
		return (
			<div>
				<ContactCreater giveDataFromForm = {this.giveDataFromForm} />
				<ContactsField  data={this.state.dataFromForm}/>
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));