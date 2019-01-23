import React, {Component} from 'react';
import axios from 'axios';
import Flights from './Flights';
import Housing from './Housing';
import Members from './Members'
import MapContainer from './MapContainer';
import Board from './DiscussionBoard/Board';
import LocationImage from './LocationImage';
import { setHousing } from '../../Redux/reducer';
import { connect } from 'react-redux';

class Trip extends Component {
    constructor() {
        super()
        this.state = {
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
            loadingFlights: 0,
            loadingHousing: 0,
            loadMap: false,
            pastTrip: false,
            housing: []
        }
    }

    componentDidMount = () => {
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
                    loading: false
                }, () => {
                    if (new Date(this.state.trip.leaving_date).getTime() - new Date().getTime() < 0) {
                        this.setState({
                            pastTrip: true
                        })
                    }
                });
            });
        }).catch(error => {
            console.log(error)
            this.props.history.push('/')
        })

        axios.get(`/trip/housing/${this.props.match.params.id}`).then(response => {
            if (response.data[0]) {
                this.props.setHousing(response.data[0])
                this.setState({
                    housing: response.data[0]
                })
            }
        }).catch(error => {
            console.log(error)
            this.props.history.push('/')
        }) 
    }
    
    getAmadeusFlights = () => {
        this.setState({loadingFlights: 1});
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
                flights: res.data,
                loadingFlights: 2
            });
        })
    }

    getAmadeusHotels = () => {

        this.setState({
            loadingHousing: 1
        })

        var Amadeus = require('amadeus');
        var amadeus = new Amadeus({
            clientId: process.env.REACT_APP_AMADEUS_KEY,
            clientSecret: process.env.REACT_APP_AMADEUS_SECRET
        })
        var leaving_date = this.state.trip.leaving_date.slice(0,10);
        var returning_date = this.state.trip.returning_date.slice(0,10);
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
                    loadingHousing: 2
                })
            })
        })
    }

    resetMap = () => {
        this.setState({
            loadMap: false
        }, () => {
            this.setState({
                loadMap: true
            })
        })
    }

    render() {

        if (this.state.loadingFlights === 0) {
            var flights = <button onClick={this.getAmadeusFlights}>Find Flights</button>
        } else if (this.state.loadingFlights === 1) {
            flights = <div className='flights-loading-animation'>
                        <i className='fas fa-2x fa-plane-departure'></i>
                        <i className='fas fa-2x fa-plane'></i>
                        <i className='fas fa-2x fa-plane-arrival'></i>
                    </div>
        } else {
            flights =  <div>
                        <Flights flights={this.state.flights} trip={this.state.trip} />
                    </div> 
        }

        if (this.state.dest_city) {
            var locationImage = <LocationImage dest_city={this.state.dest_city} destination_state={this.state.trip.destination_state}/>
        } else {
            locationImage = null;
        }

        if (this.state.housing.name) {
            var savedHousing = <div className='trip-saved-housing'>
                                <h1>{this.state.housing.name.toLowerCase()}</h1>
                                <h1>{this.state.housing.address.toLowerCase()}</h1>
                                <h1>{this.state.housing.phone}</h1>
                                <h1>{`${"$"}${this.state.housing.daily_price} per night`}</h1>
                               </div>
        } else {
            savedHousing = null
        }

        if (this.state.loadingHousing===0) {
            var housing =   <div>
                            {savedHousing}
                            <button className='getHousingButton' onClick={this.getAmadeusHotels}>Find Housing</button>
                            </div>
        } else if (this.state.loadingHousing===1) {
            housing = <div className='housing-loading-animation'>
                        <i className='fas fa-2x fa-hotel'></i>
                        <i className='fas fa-2x fa-luggage-cart'></i>
                        <i className='fas fa-2x fa-bed'></i>
                      </div>
        } else if (this.state.loadingHousing===2) {
            housing = <Housing trip_id={this.props.match.params.id} hotels={this.state.hotels} city=                {this.state.dest_city} state={this.state.trip.destination_state} checkin=                     {this.state.trip.leaving_date.slice(0,10)} checkout=                                          {this.state.trip.returning_date.slice(0,10)} resetMap={this.resetMap}/>
        }
        
        return (
            <div className='trip-component-container'>
                <div className='trip-discussion-container'>
                    <Board trip_id={this.props.match.params.id} />
                </div>
                <div className='trip-content-container'>
                    {locationImage}
                    <div className='trip-columns'>
                        <div className='trip-left-column'>
                            <div className='trip-column-flights-container'>
                                {flights}
                            </div>
                            <div className='trip-column-housing-container'>
                               {housing}
                            </div>
                            
                        </div>
                        <div className='trip-right-column'>
                            <Members
                            trip_id={this.props.match.params.id}
                            />
                            {this.state.loadMap ?
                            <MapContainer state={this.state.trip.destination_state} city={this.state.trip.destination_city}
                             />
                            :
                            null}
                        </div>
                    </div>
                </div>       
            </div>
        )
    }
}

export default connect(null, { setHousing })(Trip)