import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/ContactCreater';
import ContactsField from './components/contact_field/ContactsField';
import FormForUpdate from './components/Update_block/FormForUpdate';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			contacts : [],
			visibleUpdateForm: false
		}
		
		this.dataFromContact = {
			img: '',
			name : '',  
			lastname : '',
			number_phone : '',
			email : '',
		};

		this.updateContactGetMethod = this.updateContactGetMethod.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.changerVisibleUpdateForm = this.changerVisibleUpdateForm.bind(this);
		
	}


	changerVisibleUpdateForm() {
			this.setState(prevState => {
				console.log('seeetState', this.state.visibleUpdateForm);
				return {
					visibleUpdateForm : prevState.visibleUpdateForm? false : true
				}
		});
	}


	updateContactGetMethod(id) {
			fetch(`/UpdateContact/${id}`, {method: 'get',
				headers: {
					"Content-type": "application/json"
				},
			})
				.then(res => res.json())
				.then(data => { 
				console.log(data);
				this.dataFromContact = data;
				this.changerVisibleUpdateForm();
		});
	}

	componentDidMount() {
		console.log(document.cookie);

		fetch('/readContacts', {method: 'get',
			headers: {
				"Content-type": "application/json"
			},
		 })
			.then(res => res.json())
			.then(gotContacts => 
			this.setState({
				contacts : gotContacts,
				}));
	}



	render() {
		
		console.log(document.cookie)
		return (
			<div>
				<FormForUpdate 
				 visibleUpdateForm={this.state.visibleUpdateForm}
				 data={this.dataFromContact}
				 changerVisibleUpdateForm={this.changerVisibleUpdateForm} 
				 />
				
				<ContactCreater 
				 componentDidMount={this.componentDidMount}
				/>
				
				<ContactsField  
				 componentDidMount={this.componentDidMount}
				 data={this.state.contacts} 
				 updateContactGetMethod={this.updateContactGetMethod}
				 />
			
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));


	





	// UpdateFormPut(data) {
	// 	// const click = new Event('click');
	// 	// const generateBtn = document.querySelector('#GenerateBtn');

	// 	// let valuesForm = JSON.stringify({form : this.state, img : this.props.img});
		
	// 	fetch(url, {
	// 		method: 'post',
	// 		headers: {
	// 			"Content-type": "application/json"
	// 		},
	// 		body : data
	// 	}).then((res) => {

	// 		generateBtn.dispatchEvent(click);
	// 		this.setState({
	// 		 	name : '',
	// 		 	lastname : '',
	// 			numberPhone :  '',
	// 			email : ''
	// 		 })
			
	// 		// console.log(this.state);
	// 		return res.json();
	// 		}).then( data => {

	// 			console.log(data)
	// 			this.props.giveDataFromForm(data);

	// 		});
	// }