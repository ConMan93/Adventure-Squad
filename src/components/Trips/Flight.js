import React, {Component} from 'react';
// import moment from 'moment';

class Flight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFlight: {},
            AS: {link: "https://www.alaskaair.com/",
                airline: "Alaska Airlines"},

            // HP: {link: "https://www.onetravel.com/",
            //     airline: "America West Airlines"},

            AA: {link: "https://www.aa.com/",
                airline: "American Airlines"},

            // AP: {link: "https://www.alternativeairlines.com/air-one",
            //     airline: "Air One"},

            DL:  {link: `https://www.delta.com/flight-search/search?action=findFlights&tripType=ROUND_TRIP&priceSchedule=PRICE&originCity=${this.props.trip.origin_city.slice(0, 3)}&destinationCity=${this.props.trip.destination_city.slice(0, 3)}&departureDate=${this.props.trip.leaving_date.slice(0, 10)}&departureTime=AT&returnDate=${this.props.trip.returning_date.slice(0, 10)}&returnTime=AT&paxCount=1&searchByCabin=true&cabinFareClass=BE&deltaOnlySearch=false&deltaOnly=off&Go=Find%20Flights&meetingEventCode=&refundableFlightsOnly=false&compareAirport=false&awardTravel=false&datesFlexible=false&flexAirport=false&paxCounts[0]=1`,
                airline: "Delta Airlines"},

            HA: {link: "https://www.hawaiianairlines.com/",
                airline: "Hawaiian Airlines"},

            // NW: {link: "http://www.northwestairlines.us/",
            //     airline: "Northwest Airlines"},

            WN: {link: `https://www.southwest.com/air/booking/select.html?originationAirportCode=${this.props.trip.origin_city.slice(0, 3)}&destinationAirportCode=${this.props.trip.destination_city.slice(0, 3)}&returnAirportCode=&departureDate=${this.props.trip.leaving_date.slice(0, 10)}&departureTimeOfDay=ALL_DAY&returnDate=${this.props.trip.returning_date.slice(0, 10)}&returnTimeOfDay=ALL_DAY&adultPassengersCount=1&seniorPassengersCount=0&fareType=USD&passengerType=ADULT&tripType=roundtrip&promoCode=&reset=true&redirectToVision=true&int=HOMEQBOMAIR&leapfrogRequest=true`,
                airline: "Southwest Airlines"},

            UA: {link: `https://www.united.com/ual/en/US/flight-search/book-a-flight/results/rev?f=${this.props.trip.origin_city.slice(0, 3)}&t=${this.props.trip.destination_city.slice(0, 3)}&d=${this.props.trip.leaving_date.slice(0, 10)}&r=${this.props.trip.returning_date.slice(0, 10)}&sc=7,7&px=1&taxng=1&idx=1`,
                airline: "United Airlines"},

            B6:  {link: "https://www.jetblue.com/",
                airline: "JetBlue"},

            F9: {link: "https://www.flyfrontier.com/",
                airline: "Frontier"}
        }


    }
    
    handleAirlineResponse(obj){
        this.setState({
            selectedFlight: obj
        })
    }
    
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

        leaving = 
                <div style={{border: '1px solid green'}} onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                        <a href={`${this.state[carrierCode].link}`} target='_blank' rel="noopener noreferrer">{this.state[carrierCode].airline}</a>
                        <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                        <h1>Arriving to {arrival.iataCode} on {arrivalDate}</h1>
                        <h1>Flight will take {duration}</h1>
                    </div>

    } else {
        let segments = leavingSegments.map((segment, i) => {
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

            if (i > 0) {
                return (<div  onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                    {/* <a href={`${this.state[carrierCode].link}`} target='_blank' >{this.state[carrierCode].airline}</a> */}
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>)
            } else {
            return (
                <div onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                    <a href={`${this.state[carrierCode].link}`} target='_blank' rel="noopener noreferrer">{this.state[carrierCode].airline}</a>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>
            )}
        });
        leaving = <div style={{border: '1px solid purple'}} >
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

       returning = 
                <div style={{border: '1px solid yellow'}} onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                   <a href={`${this.state[carrierCode].link}`} target='_blank' rel="noopener noreferrer">{this.state[carrierCode].airline}</a>
                   <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                   <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                   <h1>Total flight time is {duration}</h1>
                 </div>
    } else {
        let segments = returningSegments.map((segment, i) => {
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

            if (i > 0) {
                return (<div onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>)
            } else {
            return (
                <div onClick={() => this.handleAirlineResponse({carrierCode: carrierCode, departure: departure.iataCode, arrival: arrival.iataCode, duration, departureDate, arrivalDate})}>
                    <a href={`${this.state[carrierCode].link}`} target='_blank' rel="noopener noreferrer">{this.state[carrierCode].airline}</a>
                    <h1>Departing from {departure.iataCode} on {departureDate}</h1>
                    <h1>Arriving at {arrival.iataCode} on {arrivalDate}</h1>
                    <h1>Flight time {duration}</h1>
                </div>
            )}
        });
        returning = <div style={{border: '1px solid orange'}}>
                        {segments}
                    </div>

    };

    return (
        <div>
            <h1>Flight</h1>
            <h2>Starting at {price}</h2>
            {leaving}
            {returning}

        </div>
    )
}
}


export default Flight