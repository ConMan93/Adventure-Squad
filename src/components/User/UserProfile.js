import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            friends: []
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params
        axios.get(`/profile/${id}`).then( response => {
            this.setState({
                user: response.data
            })
        })
        axios.get(`/users/getfriends/${id}`).then( response => {
            this.setState({
                friends: response.data
            })
        })
    }

  render() {
      let friends = this.state.friends.map((friend, i) => {
          return (
              <div key={i}>
                  <img src={friend.profile_img} alt='' style={{height: '50px', width: '50px'}} />
                  <p>{friend.username}</p>
              </div>
          )
      })
    return (
      <div>
        <img src={this.state.user.profile_img} alt='' />
        <p>{this.state.user.username}</p>
        <p>{`${this.state.user.username}'s friends`}</p>
        <div>{friends}</div>
      </div>
    )
  }
}
