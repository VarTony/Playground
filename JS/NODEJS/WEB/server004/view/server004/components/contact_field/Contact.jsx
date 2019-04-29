import React from 'react';

class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visible : false
		}

	}

	changerVisible () {
		this.setState(prevState => {
			return {
				visible : prevState.visible?  false : true
			}
		});
	}

	editContact(id) {
		this.changerVisible()
		this.props.updateContactGetMethod(id)
	}



	render() {
		const data =  this.props.data;
		return(
			<div id='Contact'> 
				<div className='left-side'>
					<img src={this.props.data.img} id='contactImg' onClick={e => this.changerVisible()} id='GIDOnContact'/>
				</div>

				<div className={this.state.visible? 'visible right-side' : 'hidden right-side'}>
					<h3> Id: {this.props.data.id}</h3>
					<h3> Name: {this.props.data.name}</h3>
					<h3> Lastname: {this.props.data.lastname}</h3>
					<h3>Number phone: {this.props.data.number_phone}</h3>
					<h3>Email: {this.props.data.email}</h3>
					<button className='btns' id='editBtn' onClick={() => this.editContact(data.id)} >Edit</button>
					<button className='btns' id='deleteBtn'>Delete</button>
				</div>
			</div>	);
	}
}

export default Contact;