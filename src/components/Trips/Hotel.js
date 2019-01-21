import React from 'react';

export default function Hotel (props) {
    const {base, name, rating, contact} = props;
    if(rating === "4"){
            var ratingString = `${ "⭐️⭐️⭐️⭐️"}`
    } else if(rating === "3"){
        var ratingString = `${ "⭐️⭐⭐️"}`
    } else if(rating === "2"){
        var ratingString = `${ "⭐️⭐️"}`
    } else {
        ratingString = 'No rating available'
    }

    if (contact && contact.phone) {
        var phoneNum  = contact.phone
    } else {
        phoneNum = 'No Phone Number Listed'
    }
    // console.log(props)
    return (
        <div>
            <h1>Hotels</h1>
            <h1>{name}</h1>
            <h1>{ratingString}</h1>
            <h1>{`${"$"}${base} per night`}</h1>
            {/* <h1>{phoneNum}</h1> I don't think we need phone #*/ }
        </div>
    )
}