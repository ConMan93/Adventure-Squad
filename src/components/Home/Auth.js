import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../Redux/reducer';
// import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: true,
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

    loginViewVisible = () => {
        this.setState({
            login: !this.state.login
        })
    }

    registerUser = () => {
        axios.post('/auth/register', this.state).then( response => {
            this.props.userLoggedIn(response.data)
            this.setState({
                email: '',
                username: '',
                venmo:'',
                password: '',
                confirmPassword: ''
            })
        }).catch( error => {
            this.setState({
                errorMessage: error.response.data
            })
        })
    }
    
    loginUser = () => {
        axios.post('/auth/login', this.state).then( response => {
            this.props.userLoggedIn(response.data)
            this.props.history.push('/dashboard')
        }).catch( error => {
            this.setState({
                errorMessage: error.response.data
            })
        })
    }

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        {this.state.login ? 
        <div>login
            <input placeholder='email' name='email' onChange={this.handleChange} value={this.state.email} />
            <input placeholder='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} />
            <button onClick={this.loginUser} >Log In</button>
            <p>Need an account? <button onClick={this.loginViewVisible}>Register!</button></p>
        </div>
        :
        <div>Register
            <input placeholder='email' name='email' onChange={this.handleChange} value={this.state.email} />
            <input placeholder='username' name='username' onChange={this.handleChange} value={this.state.username} />
            <input placeholder='venmo' name='venmo' onChange={this.handleChange} value={this.state.venmo} />
            <input placeholder='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} />
            <input placeholder='confirmPassword' name='confirmPassword' type='password' onChange={this.handleChange} value={this.state.confirmPassword} />
            <button onClick={this.registerUser} >Register</button>
            <p>Already have an account? <button onClick={this.loginViewVisible}>Log In!</button></p>
        </div>}
        {/* <LogoutButton /> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {userLoggedIn})(Auth)