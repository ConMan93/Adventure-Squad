import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedOut } from '../../Redux/reducer';

class LogoutButton extends Component {

    handleLogout = () => {
        axios.get('/auth/logout').then( response => {
            this.props.userLoggedOut()
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className='dashboard-logout-button'>
                {this.props.isAuthenticated ?
                <button onClick={this.handleLogout}><i className="fas fa-sign-out-alt fa-4x"></i></button>
                :
                null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps, { userLoggedOut })(LogoutButton)
