import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import MainPage from './Main_desktop_file';
// import Paint from './paint/Main_paint_file';



class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(<MainPage />);
    // return ( //
    //     <BrowserRouter>
    //       <Route path='/' component={Main_page}/>
    //       <Route path='/' component={Paint}/>
    //     </BrowserRouter>
    //
    // );
  }
}




render(<App/>, document.getElementById('root'));

// <Route path='/' component={Main_page}/>
// <Route path='/paint' component={Paint}/>
