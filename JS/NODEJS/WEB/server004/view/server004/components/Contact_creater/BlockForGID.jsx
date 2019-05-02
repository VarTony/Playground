import React, {Component} from 'react';
import GenerateBtn from './GenerateBtn';
import GIDCreator from './GIDCreator';

class BlockForGID extends Component {

	constructor(props) {
        super(props);
    }

	render() {
		return(
			<div id='BlockForGID'>
				<GIDCreator sendImg={this.props.sendImg} />
				<GenerateBtn />
			</div>
		)
	}
}


export default BlockForGID;