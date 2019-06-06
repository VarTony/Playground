import React from 'react';
import "babel-polyfill";
import { mover, handlerLogs, showLastLog} from './termHelpers/termHelpers';


class Term extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comand : '',
      logs : [],
      chargeBattery: this.props.chargeBattery
    }
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
        logs: [...this.state.logs, {comand : this.state.comand, response:  res}],
        comand : ''
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


  componentWillReceiveProps(updatedProps) {
    this.setState({
        chargeBattery: updatedProps.chargeBattery
    });
  }


  render(){
    const logs = handlerLogs(this.state.logs);
    console.log(logs);
    return(
      <div  id='term'>
        <div id='term_header'  className={this.state.chargeBattery? 'charging': 'not_charging'} onMouseDown={(e) => mover(e)}><h3 id='logo_term'>Term_alpha</h3></div>
        <div id='body_term'>
          <div id='log_field_term'>
            <ul className='logs_list'>
              {logs}
            </ul>
          </div>
          <input id='input_term' value={this.state.comand} onChange={e => this.writeInLog(e)} onKeyPress={e => this.handleInput(e)}   />
        </div>
      </div>
    );
  }
}

export default Term;
