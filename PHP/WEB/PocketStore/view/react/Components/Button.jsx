import React, {Component} from 'react'

class Button extends Component {
	
    constructor(props){
    
        super(props)        
        this.state = {
		    isClick: true
	    }
    }

	changeText(){
		this.setState({
			isClick: !this.state.isClick
		})
	}

	render() {
		return(
			<button type = 'button' id='btn' onClick={this.changeText}>
				{this.state.isClick ? 'Add to cart': 'Delete from cart'}
			</button>
		)
	}
}

export default Button
