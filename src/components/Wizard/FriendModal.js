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
           return <div key={"friend"+i} className='friend-modal-friend' style={{backgroundImage: `url(${friend.profile_img})`}}>         
                    <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
                    <button onClick={()=>this.handleAddMember(friend.id)} className='friend-modal-button'>+</button>
                  </div>
        })
        return (
            <div className='friend-modal-button-container'>
                <button onClick={this.openModal}>Add Your Squad</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <div className='friend-modal-container' style={this.props.colorStyle}>
                    <button onClick={this.closeModal} className='friend-modal-button' >X</button>
                    <h1 className='friend-modal-title' >Add Squad Members:</h1>
                    <div className='friend-modal-list-container'>
                        <div className='friend-modal-list'>
                            {displayFriends}
                        </div>
                    </div>
                    <button onClick={this.closeModal} className='friend-modal-button'>Done</button>
                </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {...state}
}

export default connect (mapStateToProps, {setMembers, setFriends})(FriendModal)