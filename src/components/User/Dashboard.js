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
            trips: [],
            profile_img: '',
            editing: false
        }
    }
    componentDidMount() {  
        let { id } = this.props.user
        axios.get('/friends/get').then(results => {
            this.props.setFriends(results.data)
        })
        axios.get(`/friends/users`).then(results => {
            this.props.displayUsers(results.data)
        })
        if (id) {
            this.loadProfile()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id && this.props.user.id !== prevProps.user.id) {
            this.loadProfile()
        }
    }

    loadProfile = () => {
        let { id } = this.props.user
        axios.get(`/trips/${id}`).then( response => {
            console.log(response.data)
            this.setState({
                trips: response.data
            })
        })
    }

    handleAddFriend(friend_id){
        axios.post('/friends/add', {friend_id} ).then(results => {
            this.props.setFriends(results.data)
            axios.get(`/friends/users`).then(results => {
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

        let tripsDisplay = this.state.trips.map((trip, i) => {
            return (
                <div key={i}>
                    <h2>{trip.destination_city},{trip.destination_state}</h2>
                    <p>Leaving: {trip.leaving_date}</p>
                    <p>Returning: {trip.returning_date}</p>
                </div>
            )
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
                    <span><i className="fas fa-search"></i></span>
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
                    {tripsDisplay}
                </div>
            </div>          
        )
    }
}
function MapStateToProps(state){
    let {user, allUsers, friends, viewedProfile, isAuthenticated} = state
    return {
        user,
        allUsers, 
        friends, 
        viewedProfile,
        isAuthenticated
    }
}
export default connect(MapStateToProps, {setFriends, displayUsers, viewProfile, setUser})(Dashboard)
