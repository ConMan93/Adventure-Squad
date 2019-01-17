import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setFriends, displayUsers, viewProfile, setUser} from '../../Redux/reducer';
import {Link} from 'react-router-dom';
import Friends from './Friends';
import Wizard from '../Wizard/Wizard';
import Header from './Header';


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
            console.log(response.data)
            this.setState({
                trips: response.data
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
            return <div key={i} className='dashboard-search-friend'>
                        <Link to={`/profile/${user.id}`}>
                        <img src={user.profile_img} alt="img" />
                        </Link>
                        <div className='search-friend-info'>
                        <h1>{user.username}</h1>
                        <button onClick={()=>this.handleAddFriend(user.id)}>Add Friend</button>
                        </div>
                    </div>
        })

        let tripsDisplay = this.state.trips.map((trip, i) => {
            return (
                <div key={i}>
                    <h2><Link to={`/trip/${trip.id}`}>{trip.destination_city},{trip.destination_state}</Link></h2>
                    <p>Leaving: {trip.leaving_date.slice(0, 10)}</p>
                    <p>Returning: {trip.returning_date.slice(0, 10)}</p>
                </div>
            )
        })


        let {username, venmo, profile_img} = this.props.user
        return(
            <div className='dashboard-component-container'>
                <div className='dashboard-header'>
                    {/* <Link to="/login">Login</Link> */}
                    <div className='dashboard-header-image'>
                        <img src={profile_img} alt="img" />
                        <i onClick={this.toggleEdit} className='fas fa-edit fa-2x'/>

                        {this.state.editing ? 
                        <div className='dashboard-header-edit'>
                            <input placeholder='Enter Image URL Here' onChange={(e)=>this.onImageChange(e.target.value)}></input> 
                            <button onClick={()=>this.handleChangeImage()}>Update Image</button>
                            <button onClick={() => {this.setState({editing: false})}}>Cancel</button>
                        </div>
                      : <div className='dashboard-header-edit dashboard-header-edit-hidden'>
                            <input placeholder='Enter Image URL Here' onChange={(e)=>this.onImageChange(e.target.value)}></input> 
                            <button onClick={()=>this.handleChangeImage()}>Update Image</button>
                            <button onClick={() => {this.setState({editing: false})}}>Cancel</button>
                        </div>
                        }
                    </div>
                    <h1 className='dashboard-header-name'>{username}</h1>
                    <div className='dashboard-header-venmo-container'><h2>{venmo}</h2></div>
               </div> 
                
                <div className='dashboard-content'>
                    <div className='dashboard-search'>
                        <h6>Search for Friends</h6>
                        <div className='dashboard-searchbar'>
                            <input onChange={(e) => this.handleSearchFriends(e.target.value)} type="text" placeholder="enter username"></input>
                            <span><i className="fas fa-search fa-2x"></i></span>
                        </div>
                        <div className='dashboard-search-list'>
                            {eachUser}
                        </div>
                    </div>
                    <div className='dashboard-friends'>
                        <h6>My Friends</h6>
                        <Friends/>
                    </div>
                    <div className='dashboard-adventures'>
                        <h6>My Adventures</h6>
                        {tripsDisplay}
                        <Wizard
                        history={this.props.history} />
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
export default connect(mapStateToProps, {setFriends, displayUsers, viewProfile, setUser})(Dashboard)
