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

		const click = new Event('click');
		const generateBtn = document.querySelector('#GenerateBtn');

		let valuesForm = JSON.stringify({form : this.state, img : this.props.img});
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body : valuesForm
		}).then((res) => {

			generateBtn.dispatchEvent(click);
			this.setState({
			 	name : '',
			 	lastname : '',
				numberPhone :  '',
				email : ''
			 })
			this.props.componentDidMount();
		})	
	}

	

	render() {

		return(
			<div className='BlockForContact'>
			<form className='FormContact'> 
				<fieldset>
					<input type='name' name='name' id='name' placeholder='First name' value={this.state.name} onChange={e => this.changeValues(e)} />
					<input type='lastname' name='lastname' id='lastname' placeholder='Last name' value={this.state.lastname} onChange={e => this.changeValues(e)} />
				</fieldset>
				<fieldset>
					<input type='numberPhone' name='numberPhone' id='numberPhone' placeholder='Number phone' value={this.state.numberPhone} onChange={e => this.changeValues(e)} />					
					<input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={e => this.changeValues(e)} />
				</fieldset>
			</form>
			<CreateBtn sendForm={this.sendForm}/> 
			</div>
			);
	}

}

export default BlockForContact;