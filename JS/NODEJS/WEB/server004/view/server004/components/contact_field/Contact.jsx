import React from 'react';

class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// data : data,
			visibility : 'hidden right-side',
			visibilityBtn : 'hidden btns'
		}

	}

	changerVisible () {
		this.setState({
			visibility : this.state.visibility ===  'hidden right-side'? 'visible right-side' : 'hidden right-side',
			visibilityBtn :  this.state.visibilityBtn === 'hidden btns' ? 'visible btns': 'hidden btns'
		});
	}

	editContact(id) {
		this.changerVisible()
		this.props.updateContactGet(id)
	}



	render() {
		// console.log(this.props.data.numberPhone);
		const data =  this.props.data;
		return(
			<div id='Contact'> 
				<div className='left-side'>
					<img src={this.props.data.img} id='contactImg' onClick={e => this.changerVisible()} id='GIDOnContact'/>
				</div>

				<div className={this.state.visibility}>
					<h3> Id: {this.props.data.id}</h3>
					<h3> Name: {this.props.data.name}</h3>
					<h3> Lastname: {this.props.data.lastname}</h3>
					<h3>Number phone: {this.props.data.number_phone}</h3>
					<h3>Email: {this.props.data.email}</h3>
					<button className={this.state.visibilityBtn} id='editBtn' onClick={() => this.editContact(data.id)} >Edit</button>
					<button className='btns' id='deleteBtn'>Delete</button>
				</div>
			</div>	);
	}
}

export default Contact;