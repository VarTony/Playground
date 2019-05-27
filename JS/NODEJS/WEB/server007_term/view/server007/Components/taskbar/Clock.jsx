import React from 'react';

class Clock extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hour: this.props.time.hour,
      minute: this.props.time.minute,
      chargeBattery: this.props.chargeBattery
    }
  }

  componentWillReceiveProps(updatedProps) {
    this.setState({
      hour: updatedProps.time.hour,
      minute: updatedProps.time.minute,
      chargeBattery: updatedProps.chargeBattery
    });
  }




  render(){
    return(
      <div id='clock'>
        <ul className={this.state.chargeBattery? 'charging': 'not_charging'}>
          <li>{this.state.hour}</li>
          <li>{this.state.minute}</li>
        </ul>
      </div>
    );
  }
}

export default Clock;
