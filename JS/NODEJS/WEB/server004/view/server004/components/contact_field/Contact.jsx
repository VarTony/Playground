import React from 'react';

class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visibility : 'hidden',
			visibilityBtn : 'hidden btns'
		}

	}

	changeVisibility () {
		this.setState({
			visibility : this.state.visibility ===  'hidden'? 'visible' : 'hidden',
			visibilityBtn :  this.state.visibilityBtn === 'hidden btns' ? 'visible btns': 'hidden btns'
		});
	}

	render() {

		return(
			<div id='Contact'> 
				<div className='left-side'>
					<img src={this.props.data.img} onClick={e => this.changeVisibility()} id='GIDOnContact'/>
					<button className={this.state.visibilityBtn} id='editBtn' >Edit</button>
				</div>

				<div className='right-side' className={this.state.visibility}>
					<h3> Id: {this.props.data.id}</h3>
					<h3> Name: {this.props.data.name} Lastname: {this.props.data.lastname}</h3>
					<h3>Number phone: {this.props.data.numberPhone} Email: {this.props.data.email}</h3>
					<button className='btns' id='deleteBtn'>Delete</button>
				</div>
			</div>	);
	}
}

export default Contact;