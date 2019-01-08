import React, { Component } from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Calendar from './components/Wizard/Calendar';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route path="/calendar" component={Calendar}/>
          </Switch>

        </div>
      </HashRouter>
    );
  }
}

export default App;
