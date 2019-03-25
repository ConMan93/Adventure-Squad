import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setFriends, displayUsers, viewProfile, setUser, setTrips} from '../../Redux/reducer';
import {Link} from 'react-router-dom';
import Friends from './Friends';
import Wizard from '../Wizard/Wizard';
import UserMap from './UserMap';
import LogoutButton from '../Home/LogoutButton';
// import LocationImage from '../Trips/LocationImage';
import EachTrip from '../Trips/EachTrip';


class Dashboard extends Component{
    constructor(){
        super()
        this.state= {
            filterFriends: "",
            trips: [],
            profile_img: '',
            editing: false,
            loadMap: false,
        }
    }
    componentDidMount() {  
        axios.get('/friends/get').then(results => {
            this.props.setFriends(results.data)
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

        axios.get(`/friends/users`).then(results => {
            this.props.displayUsers(results.data)
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
        })

        axios.get('/dashboard/trips').then( response => {
            this.setState({
                trips: response.data
            }, () => {
                this.props.setTrips(response.data)
                this.setState({
                    loadMap: true
                })
            })
        }).catch(error => {
            this.props.history.push('/')
            console.log(error)
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
        this.setState({
            filterFriends: filter.toLowerCase()
        })
    }
    onImageChange = (value) => {
        this.setState({
            profile_img: value
        })
    }
    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        })
    }


    render(){
        
        let {allUsers} = this.props
        let eachUser = allUsers.filter(user => {
           return user.username.toLowerCase().includes(this.state.filterFriends)
        }).map((user, i) => {
            return  <div key={i} className='search-friend friend'>
                        <Link to={`/profile/${user.id}`}>
                            <div>
                                <img src={user.profile_img} alt="img" height='60' width='60'/>
                                
                                <h1>{user.username}</h1>
                            </div>
                        </Link>
                        <button onClick={()=>this.handleAddFriend(user.id)}><i className="fas fa-user-plus fa-2x"></i></button>
                    </div>
        })

        let {username, profile_img} = this.props.user
        return(
            <div className='dashboard'>
                <div className='header'>
                    <div className='header-image'>
                        <img src={profile_img} alt="img" />
                        <i onClick={this.toggleEdit} className='fas fa-edit fa-2x'/>

                        {this.state.editing ? 
                        <div className='header-edit'>
                            <input placeholder='Enter Image URL Here' onChange={(e)=>this.onImageChange(e.target.value)}></input>
                            <div>
                                <button onClick={()=>this.handleChangeImage()}>Update Image</button>
                                <button onClick={() => {this.setState({editing: false})}}>Cancel</button>
                            </div> 
                        </div>
                        : 
                        null
                        }
                    </div>
                    <div className='header-name-container'><h1>{username}</h1></div>
                    <LogoutButton history={this.props.history}/>
               </div> 
                
                <div className='content'>
                    <div className='adventures'>
                        <h6>My Adventures</h6>
                        <div className='adventures-content'>
                            <div className='adventure-list'>
                                {this.state.trips.map(trip => {
                                    return (<EachTrip destination_city={trip.destination_city} 
                                                destination_state={trip.destination_state}  
                                                trip_id={trip.id} leaving_date={trip.leaving_date} 
                                                returning_date={trip.returning_date}
                                                key={trip.id} />)
                            })}

                            </div>
                            {this.state.loadMap ?
                            <UserMap />
                            :
                            null}
                        </div>
                        <Wizard
                        history={this.props.history} />
                    </div>
                    <div className='friends-search-container'>
                        <div className='friends'>
                            <h6>My Friends</h6>
                            <Friends/>
                        </div>
                        <div className='search'>
                            <h6>Find Friends</h6>
                            <div className='searchbar'>
                                <input onChange={(e) => this.handleSearchFriends(e.target.value)} type="text" placeholder="enter username"></input>
                                <span><i className="fas fa-search"></i></span>
                            </div>
                            <div className='search-list-container'>
                            <div className='search-list'>
                                {eachUser}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>          
        )
    }
}
function mapStateToProps(state){
    let {user, allUsers, friends, viewedProfile, isAuthenticated} = state
    return {
        user,
        allUsers, 
        friends, 
        viewedProfile,
        isAuthenticated
    }
}
export default connect(mapStateToProps, {setFriends, displayUsers, viewProfile, setUser, setTrips})(Dashboard)
