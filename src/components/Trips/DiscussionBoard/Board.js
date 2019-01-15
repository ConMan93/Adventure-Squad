import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import { updateDiscussionBoard } from '../../../Redux/reducer';
import Members from '../Members';

class Board extends Component {

    componentDidMount() {
        axios.get('/trip/discussion').then( response => {
            this.props.updateDiscussionBoard(response.data)
        })
    }

    displayUpdatedDiscussion = messages => {
        this.setState({
            discussion: messages
        })
    }

    render() {

        let discussionBoard = this.props.discussion.map( note => {
            return (<Message 
                key={note.id}
                message={note.message}
                user_id={note.user_id}
                id={note.id}
                displayUpdatedDiscussionFn={this.displayUpdatedDiscussion}
            />)
        })

        return (
        <div>
            Discussion!
            <MessageForm 
            displayUpdatedDiscussionFn={this.displayUpdatedDiscussion}
            />
            {discussionBoard}
          
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        discussion: state.discussion
    }
}

export default connect(mapStateToProps, { updateDiscussionBoard })(Board)
