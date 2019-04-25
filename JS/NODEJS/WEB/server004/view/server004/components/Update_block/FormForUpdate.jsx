import React from 'react';
import UpdateBtn from './UpdateBtn'


class FormForUpdate extends React.Component {

	constructor(props){
		super(props);
	

		this.state = {
			img: '',
			name : '',  //|| ''
			lastname : '',
			numberPhone : '',
			email : '',
			visability : 'hidden UpdateBlock'
			// edit: this.props.edit || false
		}
		this.sendForm = this.sendForm.bind(this);
	}
		
	
	changerValues (e) {
		const { name, value } = e.target;
		this.setState({[name]: value});
	}


	componentWillReceiveProps(updateProps) {
		console.log(updateProps)
		this.setState({
			img: updateProps.data.img,
			name : updateProps.data.name,  //|| ''
			lastname : updateProps.data.lastname,
			numberPhone : updateProps.data.number_phone,
			email : updateProps.data.email,
			visability : updateProps.visability
		})
	}



	sendForm(url) {

		const click = new Event('click');
		const generateBtn = document.querySelector('#GenerateBtn');

		let valuesForm = JSON.stringify({form : this.state, img : this.props.img});
		fetch(url, {
			method: 'post',
			headers: {
				"Content-type": "application/json"
			},
			body : valuesForm
		}).then((res) => {

			generateBtn.dispatchEvent(click);
			// this.setState({
			//  	name : '',
			//  	lastname : '',
			// 	numberPhone :  '',
			// 	email : ''
			//  })
			
			return res.json();
			}).then( data => {

				console.log(data)
				this.props.giveDataFromForm(data);

			});
			
		}



	render(){
		console.log('state update block : ',this.state, this.props.data.name);
		return(
			<div className={this.state.visability}>
				<div id='FormForUpdate'>			
					<div className='left-side'>
						<img src={this.state.img} id='updatesImg' />
						<button className='btns' onClick={this.props.componentDidMount}>Cancel</button>
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
					<UpdateBtn sendForm={this.sendForm}/> 
					</div>
				</div>	
			</div>
			
			)
		}

		// }

}

export default FormForUpdate;

			