import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setMembers, setFriends} from '../../Redux/reducer';
import {Link} from 'react-router-dom';


class Members extends Component {
  
componentDidMount(){
    let {trip_id} = this.props
    axios.get(`/trip/addmembers/${trip_id}`).then(results => {
        console.log(results.data)
        this.props.setFriends(results.data
        )
    })
    axios.get(`/trip/members/${trip_id}`).then(results => {
        this.props.setMembers(results.data)
    })
}
handleAddMember(user_id){
    let {trip_id} = this.props
    axios.post('/trip/members', {user_id, trip_id}).then(results => {
        this.props.setMembers(results.data)
        axios.get(`/trip/addmembers/${trip_id}`).then(results => {
            console.log(results.data)
            this.props.setFriends(results.data
            )
        })
    })
}
handleDeleteMember(user_id){
    let {trip_id} = this.props
    axios.delete(`/trip/member/${user_id}/${trip_id}`).then(results => {
        console.log(results.data)
        this.props.setMembers(results.data)
    })
}

    render(){
        let {friends, tripMembers} = this.props
        let displayFriends = friends.map((friend, i) => {
           return <div key={i}>
                    <div>{friend.username}</div>
                    <Link to={`/profile/${friend.id}`}><img src={friend.profile_img} alt="profile_pic"/></Link>
                    <button onClick={()=>this.handleAddMember(friend.id)}>Add Member</button>
                 </div>
        })
        let displayTripMembers = tripMembers.map((member, index) => {
            return <div key={index}>
                           <div>{member.username}</div>
                    <Link to={`/profile/${member.id}`}><img src={member.profile_img} alt="profile_pic"/></Link>
                    <button onClick={()=>this.handleDeleteMember(member.id)}>Remove From Trip</button>
                </div>
        })
        return (
            <div>
                <h1> All my friends:
                    {displayFriends}
                </h1>
                <h2> My Adventure Squad:
                    {displayTripMembers}
                </h2>
            </div>
        )
    }
}
function mapStateToProps(state){
    let {user, tripMembers, friends} = state
    return {user, tripMembers, friends}
}

export default connect (mapStateToProps, {setMembers, setFriends})(Members)