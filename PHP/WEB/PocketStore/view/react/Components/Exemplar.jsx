import React, {Component} from 'react'
import Button from './Button'
// import {render} from 'react-dom'
// import Components from './ExemplarListComponent'
// import List  from './listForExemplars'

// Created new class 'Exemplar'
class Exemplar extends Component {
    constructor(){
        super(props)	
        this.state = {
		    isOpen : true
	    }
    }
	handleClick(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	// Declare method render for component
	render () {
		const {component} = this.props;
		console.log(Button.isClick);
		return(
			<div className='bodyExemplar'>
				<p>{component.id}</p>
				<img src={component.img} onClick={this.handleClick} />

				{this.state.isOpen && <p>{component.description}</p>}
				{!this.state.isOpen && <Button/>}
				<p>{component.cost}</p>
			</div>
		)
	}
}

export default Exemplar
