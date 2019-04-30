import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateDiscussionBoard } from '../../../Redux/reducer';

class MessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            newMessage: false
        }
    }

    handleChange = e => {
        let { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        this.setState({
            newMessage: !this.state.newMessage
        })
    }

    postMessage = () => {
        let { message } = this.state
        let trip_id = +this.props.trip_id
        let date = new Date()
        axios.post('/trip/discussion', { message, trip_id, date }).then( response => {
            this.props.updateDiscussionBoard(response.data)
            this.setState({
                newMessage: false,
                message: ''
            })
        })
    }

    handleToggle = () => {
        this.setState({
            message: '',
            newMessage: false
        })
    }

  render() {

    return (
      <div className='message-form-container'>
        
        {this.state.newMessage ?
        <div>
            <textarea value={this.state.message} onChange={this.handleChange} name='message' />
            <div className='new-message-buttons'>
                <button onClick={this.postMessage}>Post</button>
                <button onClick={this.handleToggle}>Cancel</button>
            </div>
        </div> 
        :
        <button onClick={this.handleClick}>New Message</button>}
      </div>
    )
  }
}

export default connect(null, { updateDiscussionBoard })(MessageForm)