import React from 'react';
import MsgForm from './MsgForm';


class BlockForMsgs extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id='BlockForMsgs'>
				<ul className="list-group">
	 				<li className='list-group-item'>Это чат блок.</li>
     				<li className='list-group-item'></li>
     				<li className='list-group-item'>Сюда будут выводиться ваши сообщения в следующем формате : </li>
     				<li className='list-group-item'></li>
     				<li className='list-group-item'>Крыса Лариса : Привет!!</li>
     				<li className='list-group-item'>Чебурашка : Привет, крыса!! Че-почем, интеренет отключили?</li>
     				<li className='list-group-item'></li>
				</ul>
			</div>
		);
	}
}


export default BlockForMsgs;