import React from 'react';
import Clock from './Clock';
import Badge from './Badge';
// import {} from './taskbarHelpers/taskbarHelpers.js';


class Taskbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      energyLvl: this.props.energyLvl,
      chargeBattery: this.props.chargeBattery,
      badges : ['logo', 'term']
    }
  }

  componentWillReceiveProps(updatedProps) {
    this.setState({
        energyLvl: updatedProps.energyLvl,
        chargeBattery: updatedProps.chargeBattery
    })
  }


  handlerToolbar(contextOfTerm, e, badgeName) {
    e.preventDefault();

    const badgeListHandlers = {
      'term' : (e) => contextOfTerm.props.changeTermVisible(e)
    }

    badgeListHandlers[badgeName](e);
    // this.props.changeTermVisible();
    console.log(contextOfTerm.props);

  }

  render() {
    console.log('this.props :', this.props)
    const badges = this.state.badges.map(badgeName => badgeName === 'logo'?
      <Badge key={badgeName} logo={true}  toolImg={badgeName} tool={() => console.log('JS')}/> :
      <Badge key={badgeName} logo={false} toolImg={badgeName} tool={(e) => this.handlerToolbar(this, e, 'term')}/> );
    // console.log('badges : ', badges);
    return(
      <div id='toolbar'>
        <div className='badge_list'>
          {badges}
        </div>
        <div id='toolbar_info'>
        <ul className='toolbar_list'>
          <div id='energy'>
            <li className={this.state.chargeBattery? 'charging toolbar_info_li': 'not_charging toolbar_info_li'}>{this.state.energyLvl}</li>
          </div>
          <Clock time={this.props.time} chargeBattery={this.props.chargeBattery} />
        </ul>
        </div>
      </div>
    );
  }
}
export default Taskbar;
