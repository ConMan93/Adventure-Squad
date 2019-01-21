import React from 'react';

export default function Hotel (props) {
    const {base, name, rating, contact} = props;
    if (rating) {
        var ratingString = `Rated ${rating} Stars`
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
            <h1>Hotel</h1>
            <h1>{name}</h1>
            <h1>{ratingString}</h1>
            <h1>{base} / night</h1>
            <h1>{phoneNum}</h1>
            <button onClick={() => props.addHousingToTrip(props)}>Save Hotel</button>
        </div>
    )
}