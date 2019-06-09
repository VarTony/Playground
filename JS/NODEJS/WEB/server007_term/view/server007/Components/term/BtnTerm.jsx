import React from 'react';

class BtnTerm extends React.Component {

  constructor(props) {
    super(props);
  }
  // this.props.handlerBtn

  render() {
    return(
      <button className='btn_term' onClick={() => console.log('console')}>{this.props.children}</button>
    );
  }
}

export default BtnTerm;
