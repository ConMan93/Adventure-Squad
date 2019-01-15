import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setFriends, displayUsers} from '../../Redux/reducer';
import {Link} from 'react-router-dom'


class Friends extends Component {

    


    componentDidMount(){
        axios.get('/friends/get').then(results => {
            this.props.setFriends(results.data)
        })
    }
    handleDeleteFriend(id){
        axios.delete(`/friends/delete/${id}`).then(results => {
            this.props.setFriends(results.data)
            axios.get(`/friends/users`).then(results => {
                console.log(this.props.displayUsers(results.data))
                this.props.displayUsers(results.data)
            }) 
        })
    }

    render(){
        let {friends} = this.props
        let displayFriends = friends.map((friend, i) => {
           return <div key={i}>
                    <Link to={`/profile/${friend.id}`}><img src={friend.profile_img} alt="profile_pic" height="60" width="60"/></Link>
                    <span>{friend.username}</span>
                    <button onClick={()=>this.handleDeleteFriend(friend.id)}><i class="fas fa-user-minus"></i></button>
                 </div>
        })
        return (
            <div>
                <div>
                    {displayFriends}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    let {friends, user} = state
    return {friends, user}
}

export default connect(mapStateToProps, {setFriends, displayUsers})(Friends)