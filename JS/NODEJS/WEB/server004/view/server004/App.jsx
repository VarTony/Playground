import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/Contact_creater/ContactCreater';
import ContactsField from './components/Contact_field/ContactsField';
import FormForUpdate from './components/Update_block/FormForUpdate';
import BtnNext from './components/Btns_for_scroll_field_contact/BtnNext';
import BtnPrevious from './components/Btns_for_scroll_field_contact/BtnPrevious';
import Flash from './components/flash/Flash';

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

		this.flashMsg = '';
		this.pageContacts = 0;

		this.flashHandler = this.flashHandler.bind(this);
		this.updateContactGetMethod = this.updateContactGetMethod.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.changerVisibleUpdateForm = this.changerVisibleUpdateForm.bind(this);
		this.scrollContactField = this.scrollContactField.bind(this);
		
	}


	changerVisibleUpdateForm() {
			this.setState(prevState => {
				// console.log('seeetState', this.state.visibleUpdateForm);
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

	scrollContactField(act) {
		console.log(this.state.contacts.length);
		if(act === 'next' && this.state.contacts.length >= 5){
			this.pageContacts = this.pageContacts + 5;
			this.componentDidMount();
			return;
		}

		if(act === 'previous' && this.pageContacts >= 5){
			this.pageContacts = this.pageContacts - 5;
			this.componentDidMount();
			return;
		}
	}

	flashHandler(msg) {
		this.flashMsg = msg;
		setTimeout(() => {
			this.flashMsg = '';
		}, 500);
	}


	componentDidMount() {
		console.log(document.cookie);

		fetch(`/readContacts/${this.pageContacts}`, {method: 'get',
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
				<Flash 
					flashMsg={this.flashMsg}
				/>

				<FormForUpdate 
				 flashHandler={this.flashHandler}
				 visibleUpdateForm={this.state.visibleUpdateForm}
				 data={this.dataFromContact}
				 componentDidMount={this.componentDidMount}
				 changerVisibleUpdateForm={this.changerVisibleUpdateForm} 
				 />

				<BtnPrevious
				 scrollContactField = {this.scrollContactField}
				 />
				
				<BtnNext
				 scrollContactField = {this.scrollContactField}
				 />

				<ContactCreater 
				 flashHandler={this.flashHandler}
				 componentDidMount={this.componentDidMount}
				/>

				<ContactsField  
				 flashHandler={this.flashHandler}
				 componentDidMount={this.componentDidMount}
				 data={this.state.contacts} 
				 updateContactGetMethod={this.updateContactGetMethod}
				 />
			
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));
