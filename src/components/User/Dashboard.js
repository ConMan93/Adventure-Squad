import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setFriends, displayUsers, viewProfile, setUser} from '../../Redux/reducer';
import {Link} from 'react-router-dom';
import Friends from './Friends';


class Dashboard extends Component{
    constructor(){
        super()
        this.state= {
            filterFriends: "",
            adventures: [],
            profile_img: '',
            editing: false
        }
    }
    componentDidMount(){  
            axios.get('/friends/get').then(results => {
                this.props.setFriends(results.data)
            })
            axios.get(`/friends/users`).then(results => {
                this.props.displayUsers(results.data)
            }) 
        
    }

    handleAddFriend(friend_id){
        axios.post('/friends/add', {friend_id} ).then(results => {
            this.props.setFriends(results.data)
            axios.get(`/friends/users`).then(results => {
                console.log(results.data)
                this.props.displayUsers(results.data)
            }) 
        })
    }
    handleChangeImage(){
        let {id} = this.props.user
        let {profile_img} = this.state
        axios.put('/friends/img', {profile_img,id}).then(results => {
            this.props.setUser(results.data)
            this.setState({profile_image: '', editing: false})
        })
    }

    handleSearchFriends(filter){
        this.setState({filterFriends:filter})
    }
    onImageChange = (value) => {
        this.setState({profile_img:value})
    }
    toggleEdit = () => {
        this.setState({editing: !this.state.editing})
    }


    render(){
        console.log(this.props.user.profile_img)
        let {allUsers} = this.props
        let eachUser = allUsers.filter(user => {
           return user.username.toLowerCase().includes(this.state.filterFriends)
        }).map((user, i) => {
            return <div key={i}>
                <Link to={`/profile/${user.id}`}>
                <img src={user.profile_img} alt="img" />
                <p>{user.username}</p>
                </Link>
                <button onClick={()=>this.handleAddFriend(user.id)}>Add Friend</button>
            </div>
        })
        let {username, venmo, profile_img} = this.props.user
        return(
            <div>
                <Link to="/login">Login</Link>
                <br/>
               <img src={profile_img} alt="img" /><button onClick={this.toggleEdit}>Edit picture</button> 
               {this.state.editing ? 
               <div>
                   <input onChange={(e)=>this.onImageChange(e.target.value)}></input> 
                   <button onClick={()=>this.handleChangeImage()}>Update Image</button>
               </div>
               : null
               }
               {username}
               {venmo}
                <div>
                    <span>Search for friends</span><input onChange={(e) => this.handleSearchFriends(e.target.value)} type="text" placeholder="enter username"></input>
                    <span><i class="fas fa-search"></i></span>
                    <div>
                        {eachUser}
                    </div>
                </div>
                <div>
                    My friends
                    <Friends/>
                </div>
                <div>
                    My Adventures
                </div>
            </div>
        )
    }
}
function MapStateToProps(state){
    let {user, allUsers, friends, viewedProfile} = state
    return {user, allUsers, friends, viewedProfile}
}
export default connect(MapStateToProps, {setFriends, displayUsers, viewProfile, setUser})(Dashboard)
