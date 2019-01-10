import React, { Component } from 'react';
import axios from 'axios';

export default class Message extends Component {

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

  render() {
    return (
      <div style={{border: '1px solid black'}}>
        <h2>{this.state.author.username}</h2>
        {this.state.editing ?
        <textarea value={this.state.message} />
        :
        <p>{this.state.message}</p>}
        {this.state.editing ?
        <button onClick={this.handleEditClick}>save</button>
        :
        <button onClick={this.handleEditClick}>edit</button>}
      </div>
    )
  }
}
