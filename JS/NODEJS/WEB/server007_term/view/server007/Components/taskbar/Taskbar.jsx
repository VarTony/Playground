import React from 'react';
// import {} from './taskbarHelpers/taskbarHelpers.js';
import Clock from './Clock';

class Taskbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      energyLvl: this.props.energyLvl,
      chargeBattery: this.props.chargeBattery
    }
  }

  componentWillReceiveProps(updatedProps) {
    this.setState({
        energyLvl: updatedProps.energyLvl,
        chargeBattery: updatedProps.chargeBattery
    })
  }

  render() {

    return(
      <div id='taskbar'>
        <ul className='taskbar_list'>
        </ul>
        <div id='taskbar_info'>
        <ul className='taskbar_list'>
          <div id='energy'>
            <li className={this.state.chargeBattery? 'charging taskbar_info_li': 'not_charging taskbar_info_li'}>{this.state.energyLvl}</li>
          </div>
          <Clock time={this.props.time} chargeBattery={this.props.chargeBattery} />
        </ul>
        </div>

      </div>
    );
  }
}
export default Taskbar;
