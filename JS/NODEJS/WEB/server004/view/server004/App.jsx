import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/ContactCreater';
import ContactsField from './components/contact_field/ContactsField';
import FormForUpdate from './components/Update_block/FormForUpdate';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dataFromContact : {},
			contacts : [],
			visibleUpdateForm: 'hidden UpdateBlock'
		}
		this.takeDataForUpdate = this.takeDataForUpdate.bind(this);
		this.updateContactGet = this.updateContactGet.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		
	}



	updateContactGet(id) {
		// console.log(this.state.visibility === 'hidden UpdateBlock', this.state.visibility)
		fetch(`/UpdateContact/${id}`, {method: 'get',
			headers: {
				"Content-type": "application/json"
			},
		 })
			.then(res => res.json())
			.then(data => 
			this.setState({
				dataFromContact : data,
				visibleUpdateForm : this.state.visibleUpdateForm === 'hidden UpdateBlock'? 'visible UpdateBlock' : 'hidden UpdateBlock'
			}));
	}

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



	takeDataForUpdate(data) {
		console.log(data);
		this.setState({
			dataFromContact : data,
		})
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
				visibleUpdateForm : 'hidden UpdateBlock'
				}));
	}



	render() {
		
		console.log(document.cookie)
		return (
			<div>
				<FormForUpdate 
				 data={this.state.dataFromContact}
				 visability={this.state.visibleUpdateForm}
				 componentDidMount={this.componentDidMount}  
				 />
				
				<ContactCreater />
				<ContactsField  
				 data={this.state.contacts} 
				 updateContactGet={this.updateContactGet}
				 />
			
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));