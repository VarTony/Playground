import React from 'react';
import UpdateBtn from './UpdateBtn'


class FormForUpdate extends React.Component {

	constructor(props){
		super(props);
	

		this.state = {
			visibleUpdateForm : false
		}

		this.dataForForm = this.props.data;
	}
		


	componentWillReceiveProps(updatedProps) {
		console.log(updatedProps);	
		this.dataForForm = updatedProps.data; 
		this.setState({
			visibleUpdateForm : updatedProps.visibleUpdateForm
		})
	}

	render(){
		return(
			<div className={this.state.visibleUpdateForm? 'visible UpdateBlock' :'hidden UpdateBlock'}>
				<div id='formForUpdate' className='formBlock'>			
					<div className='left-side'>
						<img src={this.dataForForm.img} id='updatesImg' />
						<button className='btns' onClick={this.props.changerVisibleUpdateForm}>Cancel</button>
					</div>

					<div className='BlockForContact'>
						<form className='FormContact'> 
							<fieldset>
								<input type='name' name='name' id='name' placeholder='First name' value={this.dataForForm.name} onChange={e => this.changerValues(e)} />
								<input type='lastname' name='lastname' id='lastname' placeholder='Last name' value={this.dataForForm.lastname} onChange={e => this.changerValues(e)} />
							</fieldset>
							<fieldset>
								<input type='numberPhone' name='numberPhone' id='numberPhone' placeholder='Number phone' value={this.dataForForm.number_phone} onChange={e => this.changerValues(e)} />					
								<input type='email' name='email' id='email' placeholder='Email' value={this.dataForForm.email} onChange={e => this.changerValues(e)} />
							</fieldset>
						</form>
					<UpdateBtn/> 
					</div>
				</div>	
			</div>
			
			);
		}
	}


export default FormForUpdate;

			