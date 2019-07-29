import React from 'react';

class Badge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={this.props.logo? 'logo badge' : 'badge'} onClick={(e) => this.props.tool(e)}>
        <img src={`./imgs/toolbarImgs/${this.props.toolImg}.png`} />
      </div>
    );
  }
}

export default Badge;
