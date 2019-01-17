import React, { Component } from 'react';
import Calendar from './Calendar';
import { connect } from 'react-redux';
import { handleDestinationChange, handleCityChange, setOriginCity, setOriginState } from '../../Redux/reducer';
import cityArray from '../Trips/IATA'

class StepOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            states: cityArray
        }
    }

    fuckIt = async () => {
        let number = Math.floor(Math.random() * 50)
        let randomState = this.state.states.cityArray[number].state
        let randomCity = this.state.states.cityArray[number].cities[Math.floor(Math.random() * this.state.states.cityArray[number].cities.length)]
        console.log(randomState)
        console.log(randomCity)
        this.props.handleDestinationChange(randomState)
        await this.props.handleCityChange(randomCity)
        this.props.createTrip()
    }

    
  render() {

      
    let stateOptions = this.state.states.cityArray.map((obj, i) => {
        return (
            <option value={obj.state} key={'state'+i}>{obj.state}</option>
            )
        })
        
    const {destinationState, originState} = this.props;
    if (destinationState) {
        let state = this.state.states.cityArray.find(function(obj) {
            return obj.state === destinationState
        });
        let cities = state.cities;
        var citiesOptions = cities.map((city, i) => {
            let cityName = city.slice(4)
            return (
                <option value={city} key={i} >{cityName}</option>
            )
        })
    }

    if (originState) {
        let state = this.state.states.cityArray.find(function(obj) {
            return obj.state === originState
        });
        let cities = state.cities;
        var originCitiesOptions = cities.map((city, i) => {
            let cityName = city.slice(4)
            return (
                <option value={city} key={i} >{cityName}</option>
            )
        })
    }

    return (
      <div>
        <Calendar />
        <p>Leaving From:</p>
        <select onChange={e => this.props.setOriginState(e.target.value)}>
            <option value='' >Select State</option>
            {stateOptions}
        </select>
        <select onChange={e => this.props.setOriginCity(e.target.value)}>
            <option value='' >Select City</option>
            {originCitiesOptions}
        </select>
        <p>Going To:</p>
        <select onChange={e => this.props.handleDestinationChange(e.target.value)} value={this.props.destinationState}>
            <option value='' >Select State</option>
            {stateOptions}
        </select>
        <select onChange={e => this.props.handleCityChange(e.target.value)} value={this.props.destinationCity}>
            <option value='' >Select City</option>
            {citiesOptions}
        </select>
        {this.props.originState && this.props.originCity && this.props.from && this.props.to ?
        <button onClick={this.fuckIt}>F**k it</button>
        : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
    let { from, to, destinationState, destinationCity, originCity, originState } = state
    return {
        from,
        to,
        destinationState,
        destinationCity,
        originCity,
        originState
    }
}

export default connect(mapStateToProps, { handleDestinationChange, handleCityChange, setOriginCity, setOriginState })(StepOne)