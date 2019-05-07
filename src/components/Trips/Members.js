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
            return <div className='trip-member' key={"member"+i} style={{backgroundImage: `url(${member.profile_img})`}}>
                    <Link to={`/profile/${member.id}`}>{member.username}</Link>
                    <button onClick={()=>this.handleDeleteMember(member.id)}><i className="fas fa-user-minus"></i></button>
                </div>
        })
        return (
            <div>
                <h2> Our Adventure Squad:</h2>
                <div className='trip-members'>
                <div className='trip-members-container' style={{width: `${tripMembers.length * 10 + 10}vw`}}>
                    <FriendModal trip_id={this.props.trip_id} colorStyle={this.props.colorStyle}/>
                    {displayTripMembers}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    let {user, tripMembers, friends} = state
    return {user, tripMembers, friends}
}

export default connect (mapStateToProps, {setMembers, setFriends})(Members)