import React, {Component} from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Helmet from 'react-helmet';

export default class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            from: undefined,
            to: undefined
        }
        this.handleDayClick=this.handleDayClick.bind(this);
        this.handleResetClick=this.handleResetClick.bind(this);
    }
    handleDayClick(day){
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick(){
        this.setState({from: undefined, to: undefined})
    }
    render(){
        const {to, from} = this.state
        const modifiers = { start: from, end: to}
    
    return(
        <div>
            <p>
                {!from && !to && 'Please select the first day'}
                {from && !to && 'Please select the last day'}
                {from && to && 
                    `Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`} {' '}
                {from && to && 
                    (
                        <button className="link"onClick={this.handleResetClick}>Reset</button>
                    )}
            </p>
            <DayPicker
                className="Selectable"
                selectedDays={[from, {from, to}]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
             />
             <Helmet>
                 <style>{`
                 .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                    background-color: #f0f8ff !important;
                    color: #4a90e2;
                  }
                  .Selectable .DayPicker-Day {
                    border-radius: 0 !important;
                  }
                //   .Selectable .DayPicker-Day--start {
                //     border-top-left-radius: 50% !important;
                //     border-bottom-left-radius: 50% !important;
                //   }
                //   .Selectable .DayPicker-Day--end {
                //     border-top-right-radius: 50% !important;
                //     border-bottom-right-radius: 50% !important;
                  }
                 `}</style>
             </Helmet>
        </div>
    )
}}