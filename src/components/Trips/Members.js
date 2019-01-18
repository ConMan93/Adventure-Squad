import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setMembers, setFriends} from '../../Redux/reducer';
import {Link} from 'react-router-dom';
import FriendModal from '../Wizard/FriendModal';


class Members extends Component {
  
componentDidMount(){
    let {trip_id} = this.props
    axios.get(`/trip/members/${+trip_id}`).then(results => {
        this.props.setMembers(results.data)
    })
}

handleDeleteMember(user_id){
    let {trip_id} = this.props
    axios.delete(`/trip/member/${user_id}/${+trip_id}`).then(results => {
        this.props.setMembers(results.data)
    })
}

    render(){
        let {tripMembers} = this.props
 
        let displayTripMembers = tripMembers.map((member, i) => {
            return <div key={"member"+i}>
                    <Link to={`/profile/${member.id}`}><img src={member.profile_img} alt="profile_pic" height="60" width="60"/>
                    <div>{member.username}</div></Link>
                    <button onClick={()=>this.handleDeleteMember(member.id)}><i className="fas fa-user-times"></i></button>
                </div>
        })
        return (
            <div>
            
                <h2> My Adventure Squad:
                    {displayTripMembers}
                </h2>
                <FriendModal trip_id={this.props.trip_id}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    let {user, tripMembers, friends} = state
    return {user, tripMembers, friends}
}

export default connect (mapStateToProps, {setMembers, setFriends})(Members)