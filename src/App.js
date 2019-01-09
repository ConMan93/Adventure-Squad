import React, { Component } from 'react';
import './App.css';

//Components
import Auth from './components/Auth';
import Board from './components/Trips/DiscussionBoard/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <img src='https://picsum.photos/200/300/?random' alt='' /> */}
        <Auth />
        <Board />
      </div>
    );
  }
}

export default App;
