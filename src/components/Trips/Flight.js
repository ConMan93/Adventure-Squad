import React from 'react';

export default function Flight (props) {
    
    const {price, leavingStops, leavingSegments, returningStops, returningSegments} = props;

    var leaving;
    var returning;
    
    if (leavingStops==='Direct') {
        //formatting flight duration
        let durationArr = leavingSegments[0].flightSegment.duration.slice(3).split(/[A-Z]/gi);
        let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

        const {departure, arrival, carrierCode} = leavingSegments[0].flightSegment;

        //formatting departure date
        let departureDate = `${new Date(departure.at).getMonth()+1}/${new Date(departure.at).getDate()} ${new Date(departure.at).getHours()}:${new Date(departure.at).getMinutes()}`
        
        //fomatting arrival date
        let arrivalDate = `${new Date(arrival.at).getMonth()+1}/${new Date(arrival.at).getDate()} ${new Date(arrival.at).getHours()}:${new Date(arrival.at).getMinutes()}`

        leaving = <div>
                    <h1>Direct Flight on {carrierCode}</h1>
                    <h1>Departing From {departure.iataCode} at {departureDate}</h1>
                    <h1>Arriving At {arrival.iataCode} at {arrivalDate}</h1>
                    <h1>Flight will take {duration}</h1>
                    </div>

    } else {
        let segments = leavingSegments.map(segment => {
            const {departure, arrival, carrierCode} = segment.flightSegment;

            //formatting departure date
            let departureDate = `${new Date(departure.at).getMonth()+1}/${new Date(departure.at).getDate()} ${new Date(departure.at).getHours()}:${new Date(departure.at).getMinutes()}`
            
            //fomatting arrival date
            let arrivalDate = `${new Date(arrival.at).getMonth()+1}/${new Date(arrival.at).getDate()} ${new Date(arrival.at).getHours()}:${new Date(arrival.at).getMinutes()}`

            //formatting leg duration
            let durationArr = segment.flightSegment.duration.slice(3).split(/[A-Z]/gi);
            let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

            return (
                <div>
                    <h1>Leg: Flown on {carrierCode}</h1>
                    <h1>Departing From {departure.iataCode} at {departureDate}</h1>
                    <h1>Arriving At {arrival.iataCode} at {arrivalDate}</h1>
                    <h1>Leg will take {duration}</h1>
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
       let departureDate = `${new Date(departure.at).getMonth()+1}/${new Date(departure.at).getDate()} ${new Date(departure.at).getHours()}:${new Date(departure.at).getMinutes()}`
       
       //fomatting arrival date
       let arrivalDate = `${new Date(arrival.at).getMonth()+1}/${new Date(arrival.at).getDate()} ${new Date(arrival.at).getHours()}:${new Date(arrival.at).getMinutes()}`

       leaving = <div>
                   <h1>Direct Flight on {carrierCode}</h1>
                   <h1>Departing From {departure.iataCode} at {departureDate}</h1>
                   <h1>Arriving At {arrival.iataCode} at {arrivalDate}</h1>
                   <h1>Flight will take {duration}</h1>
                   </div>
    } else {
        let segments = returningSegments.map(segment => {
            const {departure, arrival, carrierCode} = segment.flightSegment;

            //formatting departure date
            let departureDate = `${new Date(departure.at).getMonth()+1}/${new Date(departure.at).getDate()} ${new Date(departure.at).getHours()}:${new Date(departure.at).getMinutes()}`
            
            //fomatting arrival date
            let arrivalDate = `${new Date(arrival.at).getMonth()+1}/${new Date(arrival.at).getDate()} ${new Date(arrival.at).getHours()}:${new Date(arrival.at).getMinutes()}`

            //formatting leg duration
            let durationArr = segment.flightSegment.duration.slice(3).split(/[A-Z]/gi);
            let duration = `${durationArr[0]} Hours, ${durationArr[1]} Minute(s)`;

            return (
                <div>
                    <h1>Leg: Flown on {carrierCode}</h1>
                    <h1>Departing From {departure.iataCode} at {departureDate}</h1>
                    <h1>Arriving At {arrival.iataCode} at {arrivalDate}</h1>
                    <h1>Leg will take {duration}</h1>
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