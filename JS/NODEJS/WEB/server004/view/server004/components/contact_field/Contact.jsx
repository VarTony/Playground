import React from 'react';

class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}

	}



	render() {

		return(
			<div id='Contact'>
				<div className='left-side'>
					<img src={this.props.data.img} id='GIDOnContact'/>
					<button className='btns' id='editBtn'>Edit</button>
				</div>

				<div className='right-side'>
					<h3> Id: {this.props.data.id}</h3>
					<h3> Name: {this.props.data.name} Lastname: {this.props.data.lastname}</h3>
					<h3>Number phone: {this.props.data.numberPhone} Email: {this.props.data.email}</h3>
					<button className='btns' id='deleteBtn'>Delete</button>
				</div>
			</div>	);
	}
}

export default Contact;