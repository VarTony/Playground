import React from 'react';


class Term extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      log : '',
      logs : []
    }
  }

  handleInput(e){
    let keyCode = e.keyCode || e.which;
    if(keyCode == 13) {
      //test code
      if(this.state.log.toLowerCase() === 'clear') {
        console.log(this.state.log);
        this.setState({
          logs: [],
          log : ''
        });
      }
      else{
        this.setState({
          logs: [...this.state.logs, this.state.log],
          log : ''
        });
      }
      console.log('input');
    }
  }

  //test code
  writeInLog(e) {
    const {value} = e.target;
    this.setState({
      log: value
    });
  }


  keyGenerate() {
    return Math.floor(Math.random() * 80000);

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
    //test code
    const logs = this.state.logs.map(log => <li className='logs' key={this.keyGenerate()}>{log}</li>); //key={uniqueId()}
    console.log(logs);
    //
    return(
      <div  id='term'>
        <div id='term_header' onMouseDown={this.mover}><h3 id='logo_term'>Term_alpha</h3></div>
        <div id='body_term'>
          <div id='log_field_term'>
            <ul id='logs_list'>
              {logs}
            </ul>
          </div>
          <input id='input_term' value={this.state.log} onChange={e => this.writeInLog(e)} onKeyPress={e => this.handleInput(e)}   />
        </div>
      </div>
    );
  }
}

export default Term;
