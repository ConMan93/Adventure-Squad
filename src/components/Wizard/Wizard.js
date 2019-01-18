import React, { Component } from 'react';
import Modal from 'react-modal';
import StepOne from './StepOne';
import { connect } from 'react-redux';
import { clearTrip } from '../../Redux/reducer';
import axios from 'axios';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')


class Wizard extends Component {

    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen: false
        }
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }
    
    closeModal = () => {
        this.props.clearTrip()
        this.setState({
            modalIsOpen: false
        });
    }

    createTrip = () => {
        let { originCity, originState, destinationCity, destinationState, to, from } = this.props
        axios.post('/trip/create', { originCity, originState, destinationCity, destinationState, to, from }).then( response => {
            this.setState({
                modalIsOpen: false
            })
            this.props.clearTrip()
            this.props.history.push(`/trip/${response.data.id}`)
        })
    }

  render() {
    return (
      <div className='new-trip-button-container'>
        <button className='new-trip-button' onClick={this.openModal}>Create New Trip</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <button className='wizard-close-button' onClick={this.closeModal}>X</button>
        <div className='wizard-modal-container'>
        <StepOne />
        {
        this.props.originState && this.props.originCity && this.props.destinationState && this.props.destinationCity && this.props.from && this.props.to ?
        <button onClick={this.createTrip} className='wizard-submit-button'>submit</button>
        : null
        }
        </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps, { clearTrip })(Wizard)
