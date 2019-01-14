import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            nearbyPlaces: []
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
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
        const { google } = mapProps;
        console.log(mapProps)
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapProps.initialCenter.lat},${mapProps.initialCenter.lng}&rankby=distance&keyword=food&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
            console.log(response.data.results)
            this.setState({
                nearbyPlaces: response.data.results
            })
        })
    }
    render() {
        console.log(this.state)

        const nearbyFood = this.state.nearbyPlaces.map((food, i) => {
            return (
                    <Marker
                    name={food.name}
                    title={food.name}
                    position={{lat: food.geometry.location.lat, lng: food.geometry.location.lng}}
                    onClick={this.onMarkerClick}
                    key={i}
                    vicinity={food.vicinity}
                    rating={food.rating}
                    />
            )
        })

        const nearbyFoodInfo = this.state.nearbyPlaces.map((food, i) => {
            return (
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    key={i}
                    >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{this.state.selectedPlace.vicinity}</p>
                        <p>rating: {this.state.selectedPlace.rating}</p>
                    </div>
                </InfoWindow>
            )
        })

        return (
            <Map 
            google={this.props.google} 
            zoom={14} 
            initialCenter={{lat: 40.7618, lng: -111.8907}}
            onClick={this.onMapClicked}
            onReady={this.fetchPlaces}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
                
                <InfoWindow 
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
                {nearbyFood}
                {nearbyFoodInfo}

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)