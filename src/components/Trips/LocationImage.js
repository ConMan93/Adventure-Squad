import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class LocationImage extends Component {
    constructor(){
        super()
        this.state={
            image: []
        }
    }

    componentDidMount(){
        axios.get(`https://api.unsplash.com/search/photos/?query=${this.props.destinationCity}&client_id=5ec22a23ba348f4b0bba87f28cdb59bf019b6c375eb6dfdc57a55af15b3a0de8`).then(results => {
            this.setState({image: results.data.results[Math.floor(Math.random()*10)].urls.small})
        })
    }
    render(){
        return(
            <div>
                <img src={this.state.image} alt="location"/>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    let destinationCity= state
    return{destinationCity}
}
export default connect(mapStateToProps)(LocationImage)