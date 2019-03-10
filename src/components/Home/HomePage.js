import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../Redux/reducer';
import { withRouter } from 'react-router-dom';

// SVG Imports
import {ReactComponent as Foreground} from '../../photos/Foreground.svg'
import {ReactComponent as Lowground} from '../../photos/Lowground.svg'
import {ReactComponent as Midground} from '../../photos/Midground.svg'
import {ReactComponent as Background} from '../../photos/Background.svg'
import {ReactComponent as Cliff} from '../../photos/Cliff.svg';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      animation: '',
      loginEmail: '',
      loginPassword: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      venmo: '',
      errorMessage: ''
    }
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
        [name]: value
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
        if(!this.state.username) {
            this.loginUser()
        } else {
            this.registerUser()
        }
    }
  } 

  registerUser = () => {
      axios.post('/auth/register', this.state).then( response => {
          this.props.userLoggedIn(response.data);
          this.props.history.push('/dashboard');
      }).catch( error => {
          console.log(error)
          this.setState({errorMessage: error.response.data})
      })
  }

  loginUser = () => {
      axios.post('/auth/login', this.state).then( response => {
          this.props.userLoggedIn(response.data)
          this.props.history.push('/dashboard')
      }).catch( error => {
          console.log(error)
          this.setState({errorMessage: error.response.data})
      })
  }

  handleAnimation = () => {
    this.setState({animation: 'active'})
  }

  handleReturnAnimation = () => {
    this.setState({animation: 'returning'})
  }

  skip = () => {
    this.setState({animation: 'skip'})
  }

  render() {
    if (this.state.errorMessage==='Email not found'||this.state.errorMessage==='Incorrect password') {
      var errorPosition = {left: '5%'}
    } else {
      errorPosition = {right: '5%'}
    }
    return (
      <div className={`homepage ${this.state.animation}`}>
          <div className='content-top'>
            <h1 className='title'>Adventure Squad</h1>
            <h3 className='subtitle'>The World Is Waiting .</h3>
            <button onClick={this.handleAnimation}>Get Started</button>
            <div className='dot-container'>
              <div className='dot'></div>
            </div>
            <i className="fas fa-2x fa-step-forward" onClick={this.skip}></i>
            <div className='mountains-container'>
              <Background/>
              <Midground/>
              <Lowground/>
              <Foreground/>
            </div>
          </div>
          <div className='content-bottom'>
            <div className='error-message' style={errorPosition}>
              <h1>{this.state.errorMessage}</h1>
            </div>
            <i className="fas fa-3x fa-long-arrow-alt-up" onClick={this.handleReturnAnimation}></i>
            <div className='login-container'>
                <h1>Login</h1>
                <input placeholder='email' name='loginEmail' onChange={this.handleChange} value={this.state.loginEmail} onKeyPress={this.handleKeyPress} />
                <input placeholder='password' name='loginPassword' type='password' onChange={this.handleChange} value={this.state.loginPassword} onKeyPress={this.handleKeyPress} />
                <button onClick={this.loginUser} >Log In</button>
            </div>
            <div className='register-container'>
                <h1>Register</h1>
                <input placeholder='email' name='email' onChange={this.handleChange} value={this.state.email} />
                <input placeholder='username' name='username' onChange={this.handleChange} value={this.state.username} />
                <input placeholder='venmo (optional)' name='venmo' onChange={this.handleChange} value={this.state.venmo} />
                <input placeholder='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} onKeyPress={this.handleKeyPress} />
                <input placeholder='confirm password' name='confirmPassword' type='password' onChange={this.handleChange} value={this.state.confirmPassword} onKeyPress={this.handleKeyPress} />
                <button onClick={this.registerUser} >Register</button>
            </div>
            <Cliff/>
            <div className='background-fix'></div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {userLoggedIn})(HomePage))