import React, {Component} from 'react';
import Flight from './Flight';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: this.props.flights
        }
    }
    render() {
        let flights = this.state.flights.map((flight, i) => {

            //pulling off total price
            const {total, totalTaxes} = flight.offerItems[0].price
            const priceNum = +total + +totalTaxes;
            const priceString = priceNum.toString().slice(0,6)
            const price = `$${priceString} USD (tax included)`

            //pulling off # of stops for leaving trip
            if (flight.offerItems[0].services[0].segments.length === 1) {var leavingStops = 'Direct'} else {leavingStops = flight.offerItems[0].services[0].segments.length-1}
            
            //pulling off # of stops for return trip
            if (flight.offerItems[0].services[1].segments.length === 1) {var returningStops = 'Direct'} else {returningStops = flight.offerItems[0].services[1].segments.length-1}

            const leavingSegments = flight.offerItems[0].services[0].segments;
            const returningSegments = flight.offerItems[0].services[1].segments;


            return (
                <Flight key={i} trip={this.props.trip} price={price} leavingStops={leavingStops} returningStops={returningStops} leavingSegments={leavingSegments} returningSegments={returningSegments}/>
            )
        })
        return (
            <div>
            <h1>Flights</h1>
            {flights}
            </div>
        )
    }
}