import React, {Component} from 'react';
// var airbnb = require('airapi')

export default class Housing extends Component {
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

    render() {
        const {city, state, checkin, checkout} = this.state
        const link = `https://www.airbnb.com/s/${city}--${state}--United-States/homes?query=${city}%2C%20${state}%2C%20United%20States&checkin=${checkin}&checkout=${checkout}&adults=4&price_max=100`
        return (
            <div>
                {/* <button onClick={this.getListings}>Get Listings</button> */}
                <a href={link} target='_blank'>Search Airbnb Listings</a>
            </div>
        )
    }
}