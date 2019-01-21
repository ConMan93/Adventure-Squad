import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

class UserMap extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        lat: 0,
        lng: 0,
        trips: []
    }


    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: !this.state.showingInfoWindow
        })
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    fetchPlaces = (mapProps, map) => {
        this.props.trips.forEach((trip, i) => {
            const geocoder = new mapProps.google.maps.Geocoder()
            geocoder.geocode( { 'address': `${trip.destination_state}, ${trip.destination_city.slice(4)}`}, (results, status) => {
                if (status === "OK") {
                    if (new Date(trip.leaving_date).getTime() - new Date().getTime() > 0) {
                        this.setState({
                            trips: [...this.state.trips, <Marker
                                    google={this.props.google}
                                    name={trip.name}
                                    title={`${trip.destination_city.slice(4)}, ${trip.destination_state}`}
                                    position={{lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}}
                                    onClick={this.onMarkerClick}
                                    key={i}
                                    vicinity={trip.vicinity}
                                    rating={trip.rating}
                                    icon={{
                                        url: 'http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-hi.png',
                                        scaledSize: new this.props.google.maps.Size(27, 43)
                                    }}
                                />]
                        })
                    } else {
                        this.setState({
                            trips: [...this.state.trips, <Marker
                                    google={this.props.google}
                                    name={trip.name}
                                    title={`${trip.destination_city.slice(4)}, ${trip.destination_state}`}
                                    position={{lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}}
                                    onClick={this.onMarkerClick}
                                    key={i}
                                    vicinity={trip.vicinity}
                                    rating={trip.rating}
                                    icon={{
                                        url: 'http://www.clker.com/cliparts/8/6/U/z/k/o/google-maps-marker-for-residencelamontagne-hi.png',
                                        scaledSize: new this.props.google.maps.Size(27, 43)
                                    }}
                                />]
                        })
                    }
                }
            })
        })
    }

  render() {
    return (
        <div className='user-map-container'>
        <Map 
            google={this.props.google} 
            zoom={3.7} 
            initialCenter={{lat: 39.8283, lng: -98.5795}}
            onClick={this.onMapClicked}
            onReady={this.fetchPlaces}
            style={{width: '100%', height: '100%'}}
        >
        
            {this.state.trips}
        </Map>
        </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        trips: state.trips
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(UserMap))
