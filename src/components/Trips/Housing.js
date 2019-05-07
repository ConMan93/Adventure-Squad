import React, {Component} from 'react';
import Hotel from './Hotel';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHousing } from '../../Redux/reducer';

class Housing extends Component {
    constructor(props) {
        super(props);
        const {city, state, checkin, checkout} = props
        this.state = {

            city,
            state,
            checkin,
            checkout
        }
    }

    addHousingToTrip = (hotel) => {
        let { trip_id } = this.props
        let { phone } = hotel.contact
        let { name, address, latitude, longitude } = hotel
        let daily_price = +hotel.base 
        axios.post('/trip/housing', {trip_id, phone, name, address, latitude, longitude, daily_price}).then( response => {
            this.props.setHousing(response.data)
            this.props.resetMap()
        })
    }

    render() {
        const {city, state, checkin, checkout} = this.state
        const link = `https://www.airbnb.com/s/${city}--${state}--United-States/homes?query=${city}%2C%20${state}%2C%20United%20States&checkin=${checkin}&checkout=${checkout}&adults=4&price_max=100`;

        if (this.props.hotels.length) {
        var hotels = this.props.hotels.map(hotel => {
            var price = +hotel.offers[0].price.total / ((new Date(checkout).getTime()- new Date(checkin).getTime())/86400000)
            var price1 = price.toString().slice(0,6);
            const {name, rating, contact} = hotel.hotel;
            return <Hotel base={price1} name={name} rating={rating} contact={contact} address={hotel.hotel.address.lines[0]} latitude={hotel.hotel.latitude} longitude={hotel.hotel.longitude} addHousingToTrip={this.addHousingToTrip} />
        })}
        return (
            <div className='housing'>
                <div className='hotels'>
                    {hotels}
                </div>
                <a href={link} target='_blank' rel="noopener noreferrer">Search Airbnb Listings</a>
            </div>
        )
    }
}

export default connect(null, { setHousing })(Housing)