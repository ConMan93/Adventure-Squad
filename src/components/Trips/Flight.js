import React, {Component} from 'react';
// import moment from 'moment';
import {connect} from 'react-redux';
import {setAirline} from '../../Redux/reducer';

class Flight extends Component {
    constructor(props) {
        super(props)
        this.state = {
// Alaska Airlines     
            AS:  "https://www.alaskaair.com/",
// America West Airlines  
            HP: " https://www.onetravel.com/",
// American Airlines   
            AA: "https://www.aa.com/",
// Air One 
            AP:  "https://www.alternativeairlines.com/air-one",
// Delta Air Lines 
            DL:  "https://www.delta.com/",
// Hawaiian Airlines   
            HA: " https://www.hawaiianairlines.com/",
// Northwest Airlines  
            NW: " http://www.northwestairlines.us/",
// Southwest Airlines  
            WN: " https://www.southwest.com/",
// United Airlines 
            UA: " https://www.united.com/en/us/",
// JetBlue 
            B6:  "https://www.jetblue.com/",
// Frontier 
            F9: "https://www.flyfrontier.com/"
        }

        this.handleAirlineResponse=this.handleAirlineResponse.bind(this)

    }
    
    // handleAirlineResponse(e){
    //     const {price, leavingStops, leavingSegments, returningStops, returningSegments} = this.props;
    //     console.log("hello",leavingSegments)
    //     const {carrierCode} = leavingSegments[0].flightSegment
    //     const key = `${carrierCode}`

    //     this.setState({[key]:e.target.value  })
    //     console.log(key, e.target.value)
    // }
    
    render () {
    

    const {price, leavingStops, leavingSegments, returningStops, returningSegments} = this.props;

    var leaving;
    var returning;
    
    if (leavingStops==='Direct') {
        //formatting flight duration
        let durationArr = leavingSegments[0].flightSegment.duration.slice(3).split(/[A-Z]/gi);
        let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

        const {departure, arrival, carrierCode} = leavingSegments[0].flightSegment;

        //formatting departure date
        let hours = new Date(departure.at)
        let departureDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(hours)

        //fomatting arrival date
        let date = new Date(arrival.at)
        let arrivalDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)

        leaving = <div>
                    <h1>Airline: {carrierCode}</h1>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving to {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight will take {duration}</h1>
                    </div>

    } else {
        let segments = leavingSegments.map(segment => {
            const {departure, arrival, carrierCode} = segment.flightSegment;

            //formatting departure date
            let hours = new Date(departure.at)
            let departureDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(hours)

             //fomatting arrival date
            let date = new Date(arrival.at)
            let arrivalDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)

            //formatting leg duration
            let durationArr = segment.flightSegment.duration.slice(3).split(/[A-Z]/gi);
            let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

            return (
                <div>
                    <h1>Airline: {carrierCode}</h1>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving to {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>
            )
        });
        leaving = <div>
                    {segments}
                </div>
    };

    if (returningStops === 'Direct') {
       //formatting flight duration
       let durationArr = returningSegments[0].flightSegment.duration.slice(3).split(/[A-Z]/gi);
       let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

       const {departure, arrival, carrierCode} = returningSegments[0].flightSegment;

       //formatting departure date
       let hours = new Date(departure.at)
       let departureDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(hours)

        //fomatting arrival date
       let date = new Date(arrival.at)
       let arrivalDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)

       leaving = <div>
                   <h1>Direct flight on {carrierCode}</h1>
                   <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                   <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                   <h1>Total flight time is {duration}</h1>
                   </div>
    } else {
        let segments = returningSegments.map(segment => {
            const {departure, arrival, carrierCode} = segment.flightSegment;

           //formatting departure date
           let hours = new Date(departure.at)
           let departureDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(hours)

            //fomatting arrival date
           let date = new Date(arrival.at)
           let arrivalDate = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)

            //formatting leg duration
            let durationArr = segment.flightSegment.duration.slice(3).split(/[A-Z]/gi);
            let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

            return (
                <div>
                    <h1>Airline: {carrierCode}</h1>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>
            )
        });
        returning = <div>
                        {segments}
                    </div>

    };

    return (
        <div>
            <h1>Flight</h1>
            <h2>{price}</h2>
            {leaving}
            {returning}

        </div>
    )
}
}
function mapStateToProps(state){
    let airline = state
    return airline
}
export default connect(mapStateToProps, {setAirline})(Flight)