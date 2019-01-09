import React, {Component} from 'react';

class Profile extends Component{
    constructor(){
        super()
        this.state= {
            username: "",
            profile_img: "",
            venmo: "",
            searchFriends: "",
            adventures: [],
            friends: []
        }
    }
    render(){
        return(
            <div>
                User Profile
            </div>
        )
    }
}
export default Profile
