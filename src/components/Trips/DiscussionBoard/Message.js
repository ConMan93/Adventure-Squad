import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateDiscussionBoard } from '../../../Redux/reducer';

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message,
            editing: false,
            author: {}
        }
    }

    componentDidMount() {
        axios.get(`/trip/discussionauthor/${this.props.user_id}`).then( response => {
            this.setState({
                author: response.data
            })
        })
    }

    handleEditClick = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    udpateMessage = () => {
        axios.put(`/trip/discussion/${this.props.id}`, this.state).then( response => {
            this.setState({
                editing: false
            })
        })
    }

    deleteMessage = () => {
        axios.delete(`/trip/discussion/${this.props.id}`).then( response => {
            this.props.updateDiscussionBoard(response.data)
        })
    }

  render() {
      
    return (
      <div style={{border: '1px solid black'}}>
        <h2>{this.state.author.username}</h2>

        {this.state.editing ?
        <textarea value={this.state.message} name='message' onChange={this.handleChange} />
        :
        <p>{this.state.message}</p>}

        {this.state.editing ?
        <button onClick={this.udpateMessage}>save</button>
        :
        <button onClick={this.handleEditClick}>edit</button>}
        
        <button onClick={this.deleteMessage}>delete</button>
      </div>
    )
  }
}


export default connect(null, { updateDiscussionBoard })(Message)