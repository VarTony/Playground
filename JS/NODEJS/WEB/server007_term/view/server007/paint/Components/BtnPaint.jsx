import React from 'react';

class BtnTerm extends React.Component {
  constructor(props) {
    super(props);
  }
  // this.props.handlerBtn

  render() {
    return(
      <button className='btn_contrl' onClick={e => this.props.handlerBtn(e)}>{this.props.children}</button>
    );
  }
}

export default BtnTerm;
