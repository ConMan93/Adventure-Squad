import React, { Component } from 'react';
import './reset.css';
import './app.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from './Redux/reducer';

//Components
import HomePage from './components/Home/HomePage';
import Dashboard from './components/User/Dashboard';
import UserProfile from './components/User/UserProfile';
import Trip from './components/Trips/Trip';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      colors: {
        color1: 'hsl(29,48%,87%)',
        color2: 'hsl(29,59%,64%)',
        color3: 'hsl(29,49%,53%)',
        color4: 'hsl(29,56%,45%)',
        color5: 'hsl(29,100%,29%)',
        overlay: 'hsla(29,100%,29%,0.15)'
      },
      hue: 29
    }
  }

  componentDidMount() {
    axios.get('/auth/currentuser').then( response => {
      if (response.data) {
        this.props.userLoggedIn(response.data)
      }
    })

    this.setState({
      loading: false
    })
  }


  resetColors = () => {
    this.setState({
      colors: {
        color1: 'hsl(29,48%,87%)',
        color2: 'hsl(29,59%,64%)',
        color3: 'hsl(29,49%,53%)',
        color4: 'hsl(29,56%,45%)',
        color5: 'hsl(29,100%,29%)',
        overlay: 'hsla(29,100%,29%,0.15)'
      },
      hue: 29
    })
  }




  updateHue = e => {
    var colorObj = {
      color1: `hsl(${e.target.value},48%,87%)`,
      color2: `hsl(${e.target.value},59%,64%)`,
      color3: `hsl(${e.target.value},49%,53%)`,
      color4: `hsl(${e.target.value},56%,45%)`,
      color5: `hsl(${e.target.value},100%,29%)`,
      overlay: `hsla(${e.target.value},100%,29%,0.15)`
    }
    this.setState({
      hue: e.target.value,
      colors: colorObj
    })
  }

  
  render() {
    const colorStyle= {
      "--color1": this.state.colors.color1,
      "--color2": this.state.colors.color2,
      "--color3": this.state.colors.color3,
      "--color4": this.state.colors.color4,
      "--color5": this.state.colors.color5,
      "--overlay": this.state.colors.overlay
    }
    
    return (
      <div>
        {this.state.loading ?
        <div></div>
        :
        <HashRouter>
          <div style={colorStyle}>
            <Switch> 
              <Route exact path='/' render={(props) => <HomePage {...props}/>}/>
              <Route path='/trip/:id' render={(props) => <Trip {...props} colorStyle={colorStyle}/>}/>
              <Route path="/dashboard" render={(props) => <Dashboard {...props} colorStyle={colorStyle}/>}/>
              <Route path='/profile/:id' render={(props) => <UserProfile {...props}/>}/>
            </Switch>
          </div>
        </HashRouter>}
        <div className='color-slider'>
          <div className='color-teaser'></div>
          <h2>Don't like the color theme?</h2>
          <h1>Change it!</h1>
          <div className='color-input'>
            <input type='range' min='0' max='359' value={this.state.hue} onChange={this.updateHue}/>
          </div>
          <button onClick={this.resetColors}>Reset</button>
        </div>
        </div>)
  }
}
  


export default connect(null, { userLoggedIn })(App);
