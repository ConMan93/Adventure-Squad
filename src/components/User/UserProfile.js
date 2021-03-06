import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setTrips } from '../../Redux/reducer';
import UserMap from './UserMap';
import Moment from 'react-moment';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            friends: [],
            trips: [],
            loadMap: false
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params
        axios.get(`/profile/${id}`).then( response => {
            this.setState({
                user: response.data
            })
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

        axios.get(`/users/getfriends/${id}`).then( response => {
            this.setState({
                friends: response.data
            })
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

        axios.get(`/userprofile/trips/${id}`).then( response => {
            this.props.setTrips(response.data)
            this.setState({
                trips: response.data
            }, () => {
                this.setState({
                    loadMap: true
                })
            })
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

    }

  render() {

      let friends = this.state.friends.map((friend, i) => {
          return (
              <div key={'friend' + i}>
                  <p>{friend.username}</p>
                    <img src={friend.profile_img} alt='' />
              </div>
          )
      })

      let usersTrips = this.state.trips.map((trip, i) => {
          return (
              <div key={'trip' + i} className='user-profile-trip'>
                  <h2>Trip to {trip.destination_city.slice(4)}, {trip.destination_state}</h2>
                  <h4><Moment date={trip.leaving_date} format='ddd MMM DD, YYYY' /> - <Moment date={trip.returning_date} format='ddd MMM DD, YYYY' /></h4>
              </div>
        )
      })

    return (
      <div className='user-profile-component-container'>
        <div className='user-profile-header'>
            <img src={this.state.user.profile_img} alt='' />
            <h1>{this.state.user.username}</h1>
        </div> 
        <div className='user-profile-content'>
            <div className='user-profile-friends'>
                <h1>{`${this.state.user.username}'s friends`}</h1>
                <div className='user-profile-friends-list'>{friends}</div>
            </div>
            <div className='user-profile-trips'>{usersTrips}</div>
        </div>
        <div className='user-profile-map'>{this.state.loadMap ? <UserMap /> : null}</div>
      </div>
    )
  }
}

export default connect(null, { setTrips })(UserProfile)