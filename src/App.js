import React, { Component } from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Calendar from './components/Wizard/Calendar';
import Profile from './components/User/Profile'

//Components
import Auth from './components/Auth';
import Board from './components/Trips/DiscussionBoard/Board';

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route path="/calendar" component={Calendar}/>
          </Switch>

        </div>
      </HashRouter>
=======
      <div className="App">
        {/* <img src='https://picsum.photos/200/300/?random' alt='' /> */}
        <Auth />
        <Board />
      </div>
>>>>>>> master
    );
  }
}

export default App;
