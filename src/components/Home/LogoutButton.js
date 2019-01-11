import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedOut } from '../../Redux/reducer';

class LogoutButton extends Component {

    handleLogout = () => {
        axios.get('/auth/logout').then( response => {
            this.props.userLoggedOut()
        })
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ?
                <button onClick={this.handleLogout}>Log Out</button>
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
