import React, {Component} from 'react';
import CreateBtn from './CreateBtn';

class BlockForContact extends Component {

	constructor(props) {
        super(props);

		this.state = {
			name : '',
			lastname : '',
			numberPhone :  '',
			email : ''
		}
		this.sendForm = this.sendForm.bind(this);
	}
		
		changeValues (e) {
			
			const { name, value } = e.target;
			this.setState({[name]: value});
		}


		sendForm(url) {
			
			let valuesForm = JSON.stringify({form : this.state, img : this.props.img});
			console.log(valuesForm);
			fetch(url, {
				method: 'post',
				headers: {
					"Content-type": "application/json"
				},
				body : valuesForm
			}).then((req) => console.log('У-лю-лю', req.body));
		}


	render() {

		return(
			<div id='BlockForContact'>
			<form id='FormContact'> 
				<fieldset>
					<input type='name' name='name' id='name' placeholder='First name' onChange={e => this.changeValues(e)} />
					<input type='lastname' name='lastname' id='lastname' placeholder='Last name' onChange={e => this.changeValues(e)} />
				</fieldset>
				<fieldset>
					<input type='numberPhone' name='numberPhone' id='numberPhone' placeholder='Number phone' onChange={e => this.changeValues(e)} />					
					<input type='email' name='email' id='email' placeholder='Email' onChange={e => this.changeValues(e)} />
				</fieldset>
			</form>
			<CreateBtn sendForm={this.sendForm}/> 
			</div>
			);
	}

}

export default BlockForContact;