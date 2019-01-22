import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../Redux/reducer';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

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

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }
    
    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            errorMessage: ''
        });
    } 

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            if(this.state.login) {
                this.loginUser()
            } else {
                this.registerUser()
            }
        }
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
            this.props.history.push('/dashboard');
        }).catch( error => {
            console.log(error)
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
            console.log(error)
            this.setState({
                errorMessage: error.response.data
            })
        })
    }

  render() {
    return (
        <div>
            
        <button onClick={this.openModal}>Login</button>
  
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
          <div className='auth-modal'>
              <button className='auth-close-button' onClick={this.closeModal}>X</button>
              {this.state.login ? 
              <div className='login-container'>
                  <h1>Login</h1>
                  <input placeholder='email' name='email' onChange={this.handleChange} value={this.state.email} onKeyPress={this.handleKeyPress} />
                  <input placeholder='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} onKeyPress={this.handleKeyPress} />
                  {this.state.errorMessage ?
                  <p className='login-error-message'>{this.state.errorMessage}</p>
                    :
                    null}
                  <button onClick={this.loginUser} >Log In</button>
                  <h1>Need an account?</h1>
                  <button onClick={this.loginViewVisible}>Register!</button>
              </div>
              :
              <div className='login-container register-container'>
                  <h1>Register</h1>
                  <input placeholder='email' name='email' onChange={this.handleChange} value={this.state.email} />
                  <input placeholder='username' name='username' onChange={this.handleChange} value={this.state.username} />
                  <input placeholder='venmo (optional)' name='venmo' onChange={this.handleChange} value={this.state.venmo} />
                  <input placeholder='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} onKeyPress={this.handleKeyPress} />
                  <input placeholder='confirmPassword' name='confirmPassword' type='password' onChange={this.handleChange} value={this.state.confirmPassword} onKeyPress={this.handleKeyPress} />
                  {this.state.errorMessage ?
                  <p className='login-error-message'>{this.state.errorMessage}</p>
                    :
                    null}
                  <button onClick={this.registerUser} >Register</button>
                  <h1>Already Registered?</h1>
                  <button onClick={this.loginViewVisible}>Log In!</button>
              </div>}
          </div>
      </Modal>
  </div> 
    )
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {userLoggedIn})(Auth))