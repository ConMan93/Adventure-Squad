import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import { updateDiscussionBoard } from '../../../Redux/reducer';
import { withRouter } from 'react-router-dom';

class Board extends Component {

    componentDidMount() {
        axios.get(`/trip/discussion/${this.props.trip_id}`).then( response => {
            this.props.updateDiscussionBoard(response.data)
        })
    }

    displayUpdatedDiscussion = messages => {
        this.setState({
            discussion: messages
        })
    }

    refreshDiscussion = () => {
        axios.get(`/trip/discussion/${this.props.trip_id}`).then( response => {
            this.props.updateDiscussionBoard(response.data)
        })
    }

    render() {

        let discussionBoard = this.props.discussion.map( note => {
            return (<Message 
                key={'note' + note.id}
                message={note.message}
                user_id={note.user_id}
                date={note.date}
                id={note.id}
                displayUpdatedDiscussionFn={this.displayUpdatedDiscussion}
                trip_id={this.props.trip_id}
            />)
        })

        return (
        <div className='trip-discussion'>
            <h1>Discussion</h1>
            <button className='discussion-refresh-button' onClick={this.refreshDiscussion}><i className="fas fa-sync-alt"></i></button>
            <div className='trip-discussion-messages'>
                {discussionBoard}
            </div>
            <MessageForm 
            displayUpdatedDiscussionFn={this.displayUpdatedDiscussion}
            trip_id={this.props.trip_id}
            />
          
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        discussion: state.discussion
    }
}

export default withRouter(connect(mapStateToProps, { updateDiscussionBoard })(Board))
