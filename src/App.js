import React, { Component } from 'react';
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
      this.state.loading ?
      <div></div>
      :
      <HashRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={Auth} />
          <Route path='/trip' component={Board} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/calendar" component={Calendar}/>
        </Switch>
      </HashRouter> 
    )
  }
}
  


export default connect(null, { userLoggedIn })(App);
