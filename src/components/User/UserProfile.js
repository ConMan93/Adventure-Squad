import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            friends: [],
            trips: []
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
            console.log(response.data)
            this.setState({
                trips: response.data
            })
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

    }

  render() {

      let friends = this.state.friends.map((friend, i) => {
          return (
              <div key={i}>
                  <p>{friend.username}</p>
                  <img src={friend.profile_img} alt='' style={{height: '50px', width: '50px'}} />
              </div>
          )
      })

      let usersTrips = this.state.trips.map((trip, i) => {
          return (
              <div key={'trip' + i} style={{border: '1px solid black'}}>
                  <p>Trip to {trip.destination_city.slice(4)}, {trip.destination_state}</p>
                  <p>from : {trip.leaving_date.slice(0, 10)}</p>
                  <p>from : {trip.returning_date.slice(0, 10)}</p>
              </div>
        )
      })

    return (
      <div>
        <img src={this.state.user.profile_img} alt='' />
        <p>{this.state.user.username}</p>
        <p>{`${this.state.user.username}'s friends`}</p>
        <div>{friends}</div>
        {usersTrips}
      </div>
    )
  }
}
