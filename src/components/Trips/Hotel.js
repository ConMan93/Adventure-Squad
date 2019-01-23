import React from 'react';

export default function Hotel (props) {
    const {base, name, rating, contact} = props;
    if(rating === "4"){
        var ratingString = `${ "⭐️⭐️⭐️⭐️"}`
    } else if(rating === "3"){
         ratingString = `${ "⭐️⭐⭐️"}`
    } else if(rating === "2"){
         ratingString = `${ "⭐️⭐️"}`
    } else {
        ratingString = 'No rating available'
    }

    if (contact && contact.phone) {
        var phoneNum  = contact.phone
    } else {
        phoneNum = 'No Phone Number Listed'
    }
    return (
        <div>
            <h1>Hotels</h1>
            <h1>{name}</h1>
            <h1>{ratingString}</h1>
            <h1>{base} / night</h1>
            <h1>{phoneNum}</h1>
            <h1>{`${"$"}${base} per night`}</h1>
            <h1>{phoneNum}</h1>
            <button onClick={() => props.addHousingToTrip(props)}>Save Hotel</button>
        </div>
    )
}