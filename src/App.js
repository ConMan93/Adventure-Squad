import React, { Component } from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Calendar from './components/Wizard/Calendar';
import Dashboard from './components/User/Dashboard'
import axios from 'axios';
import {connect} from 'react-redux'
import {userLoggedIn} from './Redux/reducer'

//Components
import Auth from './components/Auth';
// import Board from './components/Trips/DiscussionBoard/Board';
import Header from './components/User/Header';

class App extends Component {
  constructor(){
    super()
      this.state={ 
        loading: true
      }
  }
  componentDidMount(){
    axios.get('/auth/currentuser').then (results => {
      if (results.data) {
        this.props.userLoggedIn(results.data)
      }
    })
  }
  
  render() {
    return (
      <div>
        <Header/>
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/calendar" component={Calendar}/>
            <Route path='/login' component={Auth} />
          </Switch>

        </div>
      </HashRouter>
        {/* <img src='https://picsum.photos/200/300/?random' alt='' /> */}
        {/* <Board /> */}
      </div>
    );
  }
}
  


export default connect(null,  {userLoggedIn})(App)
