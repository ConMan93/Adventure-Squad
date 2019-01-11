import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from './Redux/reducer';

//Components
import Auth from './components/Home/Auth';
import Board from './components/Trips/DiscussionBoard/Board';
import HomePage from './components/Home/HomePage';
import Calendar from './components/Wizard/Calendar';
import Dashboard from './components/User/Dashboard';
import UserProfile from './components/User/UserProfile';
import LogoutButton from '../src/components/Home/LogoutButton';
import Header from './components/User/Header';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/auth/currentuser').then( response => {
      if (response.data) {
        console.log(response.data)
        this.props.userLoggedIn(response.data)
      }
    })

    this.setState({
      loading: false
    })
  }

  
  render() {
    
    return (
      <div>
        {this.state.loading ?
        <div></div>
        :
        <HashRouter>
          <div>
            <Header/>
            <LogoutButton />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/login' component={Auth} />
              <Route path='/trip' component={Board} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/calendar" component={Calendar}/>
              <Route path='/profile/:id' component={UserProfile} />
            </Switch>
          </div>
        </HashRouter>}
        </div>)
  }
}
  


export default connect(null, { userLoggedIn })(App);
