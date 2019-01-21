import React, {Component} from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { setDates, clearTrip } from '../../Redux/reducer';

class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            from: undefined,
            to: undefined,
        }
    
        this.handleResetClick=this.handleResetClick.bind(this);
    }
    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.props.setDates(range)
        this.setState(range);
    }

    handleResetClick(){
        this.setState({from: undefined, to: undefined})
        this.props.clearTrip()
    }
    render(){
        const {to, from} = this.state
        const modifiers = { start: from, end: to}
    return(
        <div className='wizard-calendar-container'>
            <div className='wizard-calendar-instructions'>
                <h1>
                    {!from && !to && 'Please select the first day'}
                    {from && !to && 'Please select the last day'}
                    {from && to && 
                        `Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}` } 
                </h1>
                <h2>{from && to && `${to.getTime()/86400000-from.getTime()/86400000} Days`}</h2>
                    {from && to && 
                        (
                            <button className="wizard-calendar-reset-button" onClick={this.handleResetClick}>Reset</button>
                        )}
            </div>
            <DayPicker
                className="Selectable"
                selectedDays={[from, {from, to}]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
             />
             <Helmet>
                 <style>{`
                 .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                    background-color: #ff9a49 !important;
                    color: #333;
                  }
                  .Selectable .DayPicker-Day {
                    border-radius: 0 !important;
                  }
                  .Selectable .DayPicker-Day--start {
                    border-top-left-radius: 10px !important;
                    border-bottom-left-radius: 10px !important;
                  }
                  .Selectable .DayPicker-Day--end {
                    border-top-right-radius: 10px !important;
                    border-bottom-right-radius: 10px !important;
                  }
                 `}</style>
             </Helmet>
        </div>
    )
}}

export default connect(null, { setDates, clearTrip })(Calendar)