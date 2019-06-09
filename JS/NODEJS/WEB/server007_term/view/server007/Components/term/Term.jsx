import React from 'react';
import "babel-polyfill";
import BtnTerm from './BtnTerm';
import { mover, handlerLogs, showLastLog, keyGenerate} from './termHelpers/termHelpers';


class Term extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comand : '',
      logs : [],
      chargeBattery: this.props.chargeBattery,
      oldUserString : this.props.userString,
      newUserString : this.props.userString
    }
    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
  }

  handleInput(e){
    let keyCode = e.keyCode || e.which;
    if(keyCode == 13) {
      //test code
      if(this.state.comand.toLowerCase() === 'clear') {
        console.log(this.state.comand);
        this.setState({
          logs: [],
          comand : '',
        });
        return;
      }

      if(this.state.comand.toLowerCase() === '') return;

      else {
        let comand = JSON.stringify({comand : this.state.comand});
        console.log('comand : ', comand);
        fetch('/termComand', {
			     method: 'POST',
			     headers: {
				         "Content-type": "application/json"
			     },
			     body : comand
		})
		.then(res => res.json())
		.then(res => {
      console.log('вурнулся : ', res);
      this.setState({
        logs: [...this.state.logs, {comand : `${this.state.oldUserString} ${this.state.comand}`, response:  res}],
        comand : '',
        oldUserString : this.state.newUserString,
        newUserString : res.userString
      });
      // helpers.
      showLastLog();
    })
      }
    }
  }

  //test code
  writeInLog(e) {
    const {value} = e.target;
    this.setState({
      comand: value
    });
  }

  handlerCloseBtn(e) {
    // e.preventDefault();
    console.log('close btn');
    this.setState({
      logs: [],
      comand : '',
    });

  }


  componentWillReceiveProps(updatedProps) {
    this.setState({
        chargeBattery: updatedProps.chargeBattery
    });
  }


  render(){
    const logs = handlerLogs(this.state.logs); //not_charging
    console.log(this.state);
    return(
      <div  id='term'>
        <div id='term_header'  className={this.state.chargeBattery? 'charging': 'not_charging'} onMouseDown={(e) => mover(e)}>
          <h3 id='logo_term'>Term_alpha</h3>
          <div id='term_control_block'>
            <BtnTerm handlerBtn={this.handlerCloseBtn}>X</BtnTerm>
            <BtnTerm handlerBtn={this.handlerCloseBtn}>-</BtnTerm>
          </div>
        </div>
        <div id='body_term'>
          <div id='log_field_term'>
            <ul className='logs_list'>
              {logs}
            </ul>
          </div>
          <div id='user_input'>
            <h3 id='user_string'>{this.state.newUserString}</h3>
            <input id='input_term' value={this.state.comand} onChange={e => this.writeInLog(e)} onKeyPress={e => this.handleInput(e)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Term;
