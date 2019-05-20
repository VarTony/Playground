import React from 'react';


class Term extends React.Component {
  constructor(props){
    super(props);
  }

  handleInput(e){
    let keyCode = e.keyCode || e.which;
    if(keyCode == 13) {
      console.log('input');
    }
  }

  render(){
    return(
      <div  id='term'>
        <div id='term_header'><h3 id='logo_term'>Term_alpha</h3></div>
        <div id='body_term'>
          <div id='log_field_term'> </div>
          <input id='input_term' onKeyPress={e => this.handleInput(e)}   />
        </div>
      </div>
    );
  }
}

export default Term;
