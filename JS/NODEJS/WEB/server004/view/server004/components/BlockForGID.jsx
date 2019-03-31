import React, {component} from 'react';
import GenerateBtn from './GenerateBtn';
import GIDCreator from './GIDCreator';

const BlockForGID = () => {

	return(
		<div id='BlockForGID'>
			<GIDCreator/>
			<GenerateBtn/>
		</div>
	);
}

export default BlockForGID;