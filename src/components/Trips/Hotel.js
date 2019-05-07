import React from 'react';

export default function Hotel (props) {
    const {base, name, rating, contact} = props;
    if(rating === "4"){
        var ratingString = <div><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
    } else if(rating === "3"){
        ratingString = <div><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
    } else if(rating === "5"){
        ratingString = <div><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
    } else {
        ratingString = 'No rating available'
    }

    if (contact && contact.phone) {
        var phoneNum  = contact.phone
    } else {
        phoneNum = 'No Phone Number Listed'
    }
    return (
        <div className='hotel'>
            <h1>{name.toLowerCase()}</h1>
            <h1>{ratingString}</h1>
            <h1>{phoneNum}</h1>
            <h1>{`${"$"}${base} per night`}</h1>
            <button onClick={() => props.addHousingToTrip(props)}>Save Hotel</button>
        </div>
    )
}