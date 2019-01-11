import React, {Component} from 'react';
import LogoutButton from '../Home/LogoutButton';

export default class Header extends Component {

    render(){
        return (
            <div>
                <h1>Adventure Squad!</h1>
                <LogoutButton 
                history={this.props.history}/>
            </div>
        )
    }
}
