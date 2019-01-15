import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            nearbyFoodPlaces: [],
            nearbyBars: [],
            nearbyStores: []
        }
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
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapProps.initialCenter.lat},${mapProps.initialCenter.lng}&rankby=distance&keyword=food&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
            this.setState({
                nearbyFoodPlaces: response.data.results
            })
        })

        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapProps.initialCenter.lat},${mapProps.initialCenter.lng}&rankby=distance&keyword=bar&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
            this.setState({
                nearbyBars: response.data.results
            })
        })

        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapProps.initialCenter.lat},${mapProps.initialCenter.lng}&rankby=distance&type=clothing_store&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
            this.setState({
                nearbyStores: response.data.results
            })
        })
    }

    render() {

        const nearbyFood = this.state.nearbyFoodPlaces.map((food, i) => {
            return (
                    <Marker
                        google={this.props.google}
                        name={food.name}
                        title={food.name}
                        position={{lat: food.geometry.location.lat, lng: food.geometry.location.lng}}
                        onClick={this.onMarkerClick}
                        key={i}
                        vicinity={food.vicinity}
                        rating={food.rating}
                        icon={{
                            url: 'http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-hi.png',
                            scaledSize: new this.props.google.maps.Size(27, 43)
                        }}
                    />
            )
        })

        const nearbyFoodInfo = this.state.nearbyFoodPlaces.map((food, i) => {
            return (
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    key={i}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{this.state.selectedPlace.vicinity}</p>
                        <p>rating: </p>
                        {/* <StarRatings rating={this.state.selectedPlace.rating} numberOfStars={5} starDimension='10px' /> */}
                    </div>
                </InfoWindow>
            )
        })

        const nearbyBarsToDisplay = this.state.nearbyBars.map((bar, i) => {
            return (
                <Marker
                    name={bar.name}
                    title={bar.name}
                    position={{lat: bar.geometry.location.lat, lng: bar.geometry.location.lng}}
                    onClick={this.onMarkerClick}
                    key={i}
                    vicinity={bar.vicinity}
                    rating={bar.rating}
                    icon={{
                        url: 'http://www.clker.com/cliparts/8/6/U/z/k/o/google-maps-marker-for-residencelamontagne-hi.png',
                        scaledSize: new this.props.google.maps.Size(27, 43)
                    }}
                />
            )
        })

        const nearbyBarsInfo = this.state.nearbyBars.map((bar, i) => {
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

        const nearbyStoresToDisplay = this.state.nearbyStores.map((store, i) => {
            return (
                    <Marker
                        google={this.props.google}
                        name={store.name}
                        title={store.name}
                        position={{lat: store.geometry.location.lat, lng: store.geometry.location.lng}}
                        onClick={this.onMarkerClick}
                        key={i}
                        vicinity={store.vicinity}
                        rating={store.rating}
                        icon={{
                            url: 'http://www.clker.com/cliparts/o/t/F/J/B/k/google-maps-hi.png',
                            scaledSize: new this.props.google.maps.Size(27, 43)
                        }}
                    />
            )
        })

        const nearbyStoresInfo = this.state.nearbyStores.map((store, i) => {
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
            zoom={18} 
            initialCenter={{lat: 40.7618, lng: -111.8907}}
            onClick={this.onMapClicked}
            onReady={this.fetchPlaces}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'}
                        icon={{
                            url: 'http://www.clker.com/cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png',
                            scaledSize: new this.props.google.maps.Size(27, 43)
                        }} />

                {nearbyFood}
                {nearbyFoodInfo}

                {nearbyBarsToDisplay}
                {nearbyBarsInfo}

                {nearbyStoresToDisplay}
                {nearbyStoresInfo}

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)