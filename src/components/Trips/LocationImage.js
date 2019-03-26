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
        axios.get(`https://api.unsplash.com/search/photos/?query=${this.props.dest_city} city&orientation=landscape&client_id=5ec22a23ba348f4b0bba87f28cdb59bf019b6c375eb6dfdc57a55af15b3a0de8`).then(results => {
            this.setState({image: results.data.results[Math.floor(Math.random()*5)].urls.small})
        })
    }
    render(){
        let style = {
            backgroundImage: `linear-gradient(rgba(150, 150, 150, 0.3), rgba(150, 150, 150, 0.3)), url(${this.state.image})`
        }
        return(
            <div style={style} className='trip-location-image-container'>
                <h1>{this.props.dest_city}</h1>
                <h1>{this.props.date1} to {this.props.date2}</h1>
            </div>
        )
    }
}
function mapStateToProps(state){
    let { destinationCity } = state
    return{destinationCity}
}
export default connect(mapStateToProps)(LocationImage)