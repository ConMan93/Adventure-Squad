import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';

export default class Board extends Component {

    constructor(props) {
        super(props)

        this.state = {
            discussion: []
        }
    }

    componentDidMount() {
        axios.get('/trip/discussion').then( response => {
            this.setState({
                discussion: response.data
            })
        })
    }

    render() {

        let discussionBoard = this.state.discussion.map( note => {
            return (<Message 
                key={note.id}
                message={note.message}
                user_id={note.user_id}
            />)
        })

        return (
        <div>
            Discussion!
            {discussionBoard}
        </div>
        )
    }
}
