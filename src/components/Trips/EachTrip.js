import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EachTrip extends Component {
    constructor(){
        super ()
        this.state = {
            background: ''

        }
    }
    componentDidMount(){
        axios.get(`https://api.unsplash.com/search/photos/?query=${this.props.destination_city} ${this.props.destination_state}&orientation=landscape&client_id=5ec22a23ba348f4b0bba87f28cdb59bf019b6c375eb6dfdc57a55af15b3a0de8`).then(results => {
                    this.setState({background:results.data.results[0].urls.small})
                })
    }

    render (){
        return (
            <div>
                <Link to={`/trip/${this.props.trip_id}`}>
                    <div className='dashboard-adventure' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.state.background})`, backgroundSize: 'cover',  backgroundRepeat: 'no-repeat'}}>
                        <h2 style={{color: 'white'}}>{this.props.destination_city.slice(4)}</h2>
                        <h4 style={{color: 'white'}}>{this.props.leaving_date.slice(5, 10)} - {this.props.returning_date.slice(5, 10)}</h4>  
                    </div>
                </Link>
            </div>
        )
    }
}