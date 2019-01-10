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
        axios.post('/trip/discussion', this.state).then( response => {
            this.props.updateDiscussionBoard(response.data)
            this.setState({
                newMessage: false,
                message: ''
            })
        })
    }

  render() {
    return (
      <div>
        Message Form
        <button onClick={this.handleClick}>Create New Message</button>
        {this.state.newMessage ?
        <div>
            <textarea value={this.state.message} onChange={this.handleChange} name='message' />
            <button onClick={this.postMessage}>Post</button>
        </div> 
        :
        null}
      </div>
    )
  }
}

export default connect(null, { updateDiscussionBoard })(MessageForm)