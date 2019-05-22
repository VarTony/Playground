import React from 'react';


class Term extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comand : '',
      // response : [],
      logs : []
    }
  }

  handleInput(e){
    let keyCode = e.keyCode || e.which;
    const logFieldTerm = document.querySelector('#log_field_term');
    if(keyCode == 13) {
      //test code
      if(this.state.comand.toLowerCase() === 'clear') {
        console.log(this.state.comand);
        this.setState({
          logs: [],
          comand : ''
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
		.then(res => res.text())
		.then(res => {
      console.log('вурнулся : ', res);
      this.setState({
        logs: [...this.state.logs, {comand : this.state.comand, response:  res}],
        // response: [...this.state.response, res],
        comand : ''
      });
      logFieldTerm.scrollTop = logFieldTerm.scrollHeight;
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





  mover(e){
    e.preventDefault();
    const term = document.querySelector('#term');
    let mousePosition;
    let offset = [term.offsetLeft - e.clientX, term.offsetTop - e.clientY ];
  	let timeOfClick = performance.now();
  	term.style.position = 'absolute';
  	moveAt(e);
  	document.body.appendChild(term);
  	term.style.zIndex = 16;

  	function moveAt(e) {
      mousePosition = {x : e.clientX, y : e.clientY}
        term.style.left = (mousePosition.x + offset[0]) + 'px';
        term.style.top  = (mousePosition.y + offset[1]) + 'px';
  		}
  	document.onmousemove = e => moveAt(e);

    term.onmouseup = () => {
  		timeOfClick = performance.now() - timeOfClick;
  		document.onmousemove = null;
  		term.onmouseup = null;
  	}
  }




  render(){
    const keyGenerate = () => Math.floor(Math.random() * 80000);


    const logs = this.state.logs.map(log =>   {
      let response = log.response.split(' ')[0] !== 'Command'
        ? log.response.split(' ').map(res => <li className='logs_with_indent' key={keyGenerate()}>{res}</li>)
        : log.response;


      return (
        <ul className='logs_list' key={keyGenerate()}>
          <br/>
          <br/>
          <li className='logs' key={keyGenerate()}>{log.comand}</li>
          {response}
        </ul>);
    });

    console.log(logs);
    //
    return(
      <div  id='term'>
        <div id='term_header' onMouseDown={this.mover}><h3 id='logo_term'>Term_alpha</h3></div>
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
