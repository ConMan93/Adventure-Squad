import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from './Redux/reducer';

//Components
// import Auth from './components/Home/Auth';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/User/Dashboard';
import UserProfile from './components/User/UserProfile';
import Trip from './components/Trips/Trip';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/auth/currentuser').then( response => {
      console.log(response.data)
      if (response.data) {
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
            <Switch>
              <Route exact path='/' component={HomePage} />
              {/* <Route path='/login' component={Auth} /> */}
              <Route path='/trip/:id' component={Trip} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path='/profile/:id' component={UserProfile} />
            </Switch>
          </div>
        </HashRouter>}
        </div>)
  }
}
  


export default connect(null, { userLoggedIn })(App);
