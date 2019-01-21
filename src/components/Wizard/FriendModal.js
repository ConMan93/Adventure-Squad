import React,  {Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setMembers, setFriends} from '../../Redux/reducer';
import axios from 'axios'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)', 
        height: '50%',
        width: '50%'
    }
};

Modal.setAppElement('#root')

class FriendModal extends Component {
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen: false
        }
    }

    componentDidMount(){
        let {trip_id} = this.props
        axios.get(`/trip/addmembers/${+trip_id}`).then(results => {
            this.props.setFriends(results.data
            )
        })
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }
    
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    handleAddMember(user_id){
        let trip_id = +this.props.trip_id
        axios.post('/trip/members', {user_id, trip_id}).then(results => {
            this.props.setMembers(results.data)
            axios.get(`/trip/addmembers/${trip_id}`).then(results => {
                this.props.setFriends(results.data
                )
            })
        })
    }
    render(){
        let {friends} = this.props
        let displayFriends = friends.map((friend, i) => {
           return <div key={"friend"+i}>
                    <Link to={`/profile/${friend.id}`}><img src={friend.profile_img} alt="profile_pic" height="40" width="40"/>
                    <span>{friend.username}</span></Link>
                    <button onClick={()=>this.handleAddMember(friend.id)}><i className="fas fa-plus"></i></button>
                 </div>
        })
        return (
            <div className='friend-modal-container'>
                <button onClick={this.openModal}>Add Your Squad</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <button onClick={this.closeModal} >close</button>
                <h1> Add Squad Members:
                    {displayFriends}
                </h1>
                <button onClick={this.closeModal} ><i className="far fa-check-circle"></i></button>
            
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {...state}
}

export default connect (mapStateToProps, {setMembers, setFriends})(FriendModal)