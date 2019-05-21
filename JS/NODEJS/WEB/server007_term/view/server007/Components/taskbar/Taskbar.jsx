import React from 'react';


class Taskbar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div id='taskbar'>
        <ul id='taskbar_list'>
        </ul>
      </div>
    );
  }
}
export default Taskbar;
