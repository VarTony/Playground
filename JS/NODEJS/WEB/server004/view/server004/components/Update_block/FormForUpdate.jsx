import React from 'react';
import UpdateBtn from './UpdateBtn'


class FormForUpdate extends React.Component {

	constructor(props){
		super(props);
	

		this.state = {
			visibleUpdateForm : false,
			// form : this.props.data
			name : this.props.data.name,
			lastname : this.props.data.lastname,
			numberPhone :  this.props.data.number_phone,
			email : this.props.data.email,
			img: this.props.data.img
			// id:  this.props.data.id
		}

		this.updateForm = this.updateForm.bind(this);
		// this.img = this.props.data.img;
	}
	
	updateForm(url) {

		let valuesForm = JSON.stringify({form : this.state});
		console.log(this.state);
		fetch(url, {
			method: 'PUT',
			headers: {
				"Content-type": "application/json"
			},
			body : valuesForm
		}).then(res =>  res.text())
		.then(res => {
			console.log(res);
			this.props.flashHandler(res);
			this.props.changerVisibleUpdateForm();
			this.props.componentDidMount();
		})	
	}

	changerValues (e) {
		const { name, value } = e.target;
		this.setState({[name] : value});
	}


	componentWillReceiveProps(updatedProps) {
		console.log(updatedProps);	
		this.setState({
			visibleUpdateForm : updatedProps.visibleUpdateForm,
			name : updatedProps.data.name,
			lastname : updatedProps.data.lastname,
			numberPhone :  updatedProps.data.number_phone,
			email : updatedProps.data.email,
			img: updatedProps.data.img
		})
	}

	render(){
		return(
			<div className={this.state.visibleUpdateForm? 'visible UpdateBlock' :'hidden UpdateBlock'}>
				<div id='formForUpdate' className='formBlock'>			
					<div className='left-side'>
						<img src={this.state.img} id='updatesImg' />
						<button className='btns' onClick={this.props.changerVisibleUpdateForm}>Cancel</button>
					</div>

					<div className='BlockForContact'>
						<form className='FormContact'> 
							<fieldset>
								<input type='name' name='name' id='name' placeholder='First name' value={this.state.name} onChange={e => this.changerValues(e)} />
								<input type='lastname' name='lastname' id='lastname' placeholder='Last name' value={this.state.lastname} onChange={e => this.changerValues(e)} />
							</fieldset>
							<fieldset>
								<input type='numberPhone' name='numberPhone' id='numberPhone' placeholder='Number phone' value={this.state.numberPhone} onChange={e => this.changerValues(e)} />					
								<input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={e => this.changerValues(e)} />
							</fieldset>
						</form>
					<UpdateBtn updateForm={this.updateForm} idContact={this.props.data.id}  /> 
					</div>
				</div>	
			</div>
			
			);
		}
	}


export default FormForUpdate;

			