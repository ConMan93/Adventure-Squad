import React, {Component} from 'react';
import axios from 'axios';
import Flights from './Flights';
import Housing from './Housing';
import FriendModal from '../Wizard/FriendModal';
import Members from './Members'

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
            loading: false
        }
    }
    
    handleGetFlight = () => {
        this.setState({
            loading: true
        })
        const url = this.props.location.pathname;
        axios.get(url).then(res => {
            this.setState({
                trip: res.data[0]
            });
            this.setState({
                org_IATA: this.state.trip.origin_city.slice(0,3),
                dest_IATA: this.state.trip.destination_city.slice(0,3),
                org_city: this.state.trip.origin_city.slice(4),
                dest_city: this.state.trip.destination_city.slice(4),
            });
            // this.getGeocodingCoordinates();
            this.getAmadeus();
        });
    }

    // getGeocodingCoordinates = () => {
    //     const {org_city, dest_city} = this.state;
    //     const {origin_state, destination_state} = this.state.trip;
    //     console.log('getting in function')
    //     console.log(org_city, dest_city, origin_state, destination_state)
    //     // console.log(IATAArray)
    //     axios.get(`http://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?apiKey=${process.env.REACT_APP_GEOSERVICES_KEY}=&version=4.01&city=${org_city}&state=${origin_state}`).then(res => {
    //         console.log(res)
    //         let arr = res.data.split(',')
    //         this.setState({
    //             org_lat: arr[3],
    //             org_lng: arr[4]
    //         })
    //         console.log('done2', this.state.org_lat, this.state.org_lng)
    //     })
    //     axios.get(`http://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?apiKey=${process.env.REACT_APP_GEOSERVICES_KEY}=&version=4.01&city=${dest_city}&state=${destination_state}`).then(res => {
    //         let arr = res.data.split(',')
    //         this.setState({
    //             dest_lat: arr[3],
    //             dest_lng: arr[4]
    //         })
    //         console.log('done1', this.state.dest_lat, this.state.dest_lng)
    //     })
    // }

    getAmadeus = () => {
        var Amadeus = require('amadeus');
        var amadeus = new Amadeus({
            clientId: process.env.REACT_APP_AMADEUS_KEY,
            clientSecret: process.env.REACT_APP_AMADEUS_SECRET
        })
        var leaving_date = this.state.trip.leaving_date.slice(0,10);
        var returning_date = this.state.trip.returning_date.slice(0,10);
        console.log(leaving_date, returning_date);
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
                    hotels: results2.slice(0,5)
                })
            })
        })
    }

    render() {
        if (!this.state.flights.length) {
            var trip = <div>one moment while we search for flights</div>
        } else {
            trip =  <div>
                        <h1>Trip to {this.state.dest_city}</h1>
                     
                        <Flights flights={this.state.flights} />
                        <Housing hotels={this.state.hotels} city={this.state.dest_city} state={this.state.trip.destination_state} checkin={this.state.trip.leaving_date.slice(0,10)} checkout={this.state.trip.returning_date.slice(0,10)}/>
                    </div> 
        }
        return (
            <div>
                <button onClick={this.handleGetFlight}>Find Fight and Accomodations</button>
                <FriendModal
                trip_id={this.props.match.params.id}
                />
                {this.state.loading ?
                trip
                :
                null}
                <Members
                trip_id={this.props.match.params.id}
                />
            </div>
        )
    }
}