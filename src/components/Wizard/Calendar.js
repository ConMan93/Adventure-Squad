import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Calendar extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render(){

    
    return(
        <div>
            <DayPicker/>
        </div>
    )
}}