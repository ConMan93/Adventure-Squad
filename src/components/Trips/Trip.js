import React, {Component} from 'react';
import axios from 'axios';
import Flights from './Flights';
import Housing from './Housing';
import FriendModal from '../Wizard/FriendModal';
import Members from './Members'
import MapContainer from './MapContainer';
import Board from './DiscussionBoard/Board';

export default class Trip extends Component {
    constructor() {
        super()
        this.state = {
            // tripID: this.props.tripID,
            trip: {},
            org_lat: '',
            org_lng: '',
            org_IATA: '',
            org_city: '',
            dest_lat: '',
            dest_lng: '',
            dest_IATA: '',
            dest_city: '',
            flights: [],
            hotels: [],
            loading: true,
            loadMap: false,
            pastTrip: false
        }
    }

    componentDidMount() {
        const url = this.props.location.pathname;
        axios.get(url).then(res => {
            this.setState({
                trip: res.data[0]
            }, () => {
                this.setState({
                    org_IATA: this.state.trip.origin_city.slice(0,3),
                    dest_IATA: this.state.trip.destination_city.slice(0,3),
                    org_city: this.state.trip.origin_city.slice(4),
                    dest_city: this.state.trip.destination_city.slice(4),
                    loadMap: true,
                }, () => {
                    let date = new Date()
                    let leavingDateYear = this.state.trip.leaving_date.slice(0, 4)
                    let currentYear = date.getFullYear()
                    let leavingDateMonth = this.state.trip.leaving_date.slice(5, 7)
                    let currentMonth = date.getMonth() + 1
                    let leavingDateDay = this.state.trip.leaving_date.slice(8, 10)
                    let currentDay = date.getDate()
                    if (currentDay > +leavingDateDay) {
                        console.log('muppet')
                        if (currentMonth >= +leavingDateMonth) {
                            console.log('you smell')
                            if (currentYear >= +leavingDateYear) {
                                console.log('so bad')
                                this.setState({
                                    pastTrip: true
                                })
                            }
                        }
                    }
                });
            });
        }).catch(error => {
            console.log(error)
            this.props.history.push('/')
        })
    }
    getAmadeus = () => {
        
        var Amadeus = require('amadeus');
        var amadeus = new Amadeus({
            clientId: process.env.REACT_APP_AMADEUS_KEY,
            clientSecret: process.env.REACT_APP_AMADEUS_SECRET
        })
        var leaving_date = this.state.trip.leaving_date.slice(0,10);
        var returning_date = this.state.trip.returning_date.slice(0,10);
        amadeus.shopping.flightOffers.get({
            origin: this.state.org_IATA,
            destination: this.state.dest_IATA,
            departureDate: leaving_date,
            returnDate: returning_date,
            max: 5,
            currency: 'USD'
        }).then(res => {
            this.setState({
                flights: res.data
            });
            amadeus.shopping.hotelOffers.get({
                cityCode: this.state.dest_IATA,
                checkInDate: leaving_date,
                checkOutDate: returning_date,
                radius: 20,
                radiusUnit: 'MILE'
            }).then(res => {
                var results1 = res.data.filter(hotel => {
                    return hotel.hotel.rating >= 3
                })
                var results2 = results1.filter(hotel => {
                    return hotel.hotel.address.stateCode === this.state.trip.destination_state
                })
                this.setState({
                    hotels: results2.slice(0,5),
                }, () => {
                    this.setState({
                        loading: false
                    })
                })
            })
        })
    }

    render() {

        console.log(this.state)

        if (this.state.loading) {
            var trip = <div>one moment while we search for flights</div>
        } else {
            trip =  <div>
                        <Flights flights={this.state.flights} />
                        <Housing hotels={this.state.hotels} city={this.state.dest_city} state={this.state.trip.destination_state} checkin={this.state.trip.leaving_date.slice(0,10)} checkout={this.state.trip.returning_date.slice(0,10)}/>
                    </div> 
        }
        return (
            <div>
                <h1>Trip to {this.state.dest_city}, {this.state.trip.destination_state}</h1>
                {this.state.pastTrip ?
                null
                :
                <div>
                    <button onClick={this.getAmadeus}>Find Flight and Accomodations</button>
                    <FriendModal
                    trip_id={this.props.match.params.id}
                    />
                </div>}
                {this.state.loading ?
                null
                :
                trip}
                <Members
                trip_id={this.props.match.params.id}
                />
                <Board trip_id={this.props.match.params.id} />
                {this.state.loadMap ?
                <MapContainer state={this.state.trip.destination_state} city={this.state.trip.destination_city} />
                :
                null}
            </div>
        )
    }
}