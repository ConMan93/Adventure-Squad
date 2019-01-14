import React, { Component } from 'react';
import Calendar from './Calendar';
import { connect } from 'react-redux';
import { handleDestinationChange, handleCityChange, setOriginCity, setOriginState } from '../../Redux/reducer';
import { getStatesOfCountry, getCitiesOfState } from 'country-state-city';

class StepOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            states: []
        }
    }

    componentDidMount() {
        let b = getStatesOfCountry(231)
        this.setState({
            states: b
        })
    }
    
  render() {

    let citiesOptions = []

      let stateOptions = this.state.states.map(state => {
          return (
              <option value={state.id} key={state.id} name={state.name} >{state.name}</option>
          )
      })

      if (this.props.destinationState) {
          let cities = getCitiesOfState(this.props.destinationState)
          citiesOptions = cities.map((city, i) => {
              return (
                  <option value={city.name} key={i} >{city.name}</option>
              )
          })
      }

    let originCitiesOptions = []
      if (this.props.originState) {
        let originCities = getCitiesOfState(this.props.originState)
        originCitiesOptions = originCities.map((city, i) => {
            return (
                <option value={city.name} key={i} >{city.name}</option>
            )
        })
      }

    return (
      <div>
        <Calendar />
        <p>Coming From:</p>
        <select onChange={e => this.props.setOriginState(e.target.value)}>
            <option value='' >Select State</option>
            {stateOptions}
        </select>
        <select onChange={e => this.props.setOriginCity(e.target.value)}>
            <option value='' >Select City</option>
            {originCitiesOptions}
        </select>
        <p>Going To:</p>
        <select onChange={e => this.props.handleDestinationChange(e.target.value)}>
            <option value='' >Select State</option>
            {stateOptions}
        </select>
        <select onChange={e => this.props.handleCityChange(e.target.value)}>
            <option value='' >Select City</option>
            {citiesOptions}
        </select>
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