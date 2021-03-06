import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { connect } from 'react-redux';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            nearbyFoodPlaces: [],
            nearbyBars: [],
            nearbyStores: [],
            lat: 0,
            lng: 0
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
        
        const geocoder = new mapProps.google.maps.Geocoder()
        geocoder.geocode( { 'address': `${this.props.state}, ${this.props.city.slice(4)}`}, (results, status) => {
            if (status === "OK") {
                this.setState({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }, () => {
                    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.housing.latitude || this.state.lat},${this.props.housing.longitude || this.state.lng}&rankby=distance&keyword=food&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
                        this.setState({
                            nearbyFoodPlaces: response.data.results
                        }, () => {
                            axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.housing.latitude || this.state.lat},${this.props.housing.longitude || this.state.lng}&rankby=distance&keyword=bar&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
                                this.setState({
                                    nearbyBars: response.data.results
                                }, () => {
                                    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.housing.latitude || this.state.lat},${this.props.housing.longitude || this.state.lng}&rankby=distance&type=clothing_store&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`).then( response => {
                                        this.setState({
                                            nearbyStores: response.data.results
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            } else {
                console.log('something went wrong ' + status)
            }
        }) 

    }

    nearbyFoodPlaces() {
        return this.state.nearbyFoodPlaces.map((food, i) => {
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
                            url: 'https://redsedona.com/wp-content/uploads/restaurant-icon.png',
                            scaledSize: new this.props.google.maps.Size(27, 27)
                        }}
                    />
            )
        })
    }

    nearbyFoodInfo() {
        return this.state.nearbyFoodPlaces.map((food, i) => {
            return (
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    key={i}
                    onClose={this.onMapClicked}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{this.state.selectedPlace.vicinity}</p>
                        {this.state.selectedPlace.rating ?
                        <p>rating: {this.state.selectedPlace.rating}</p>
                        :
                        null}
                        {this.state.selectedPlace.phone ?
                        <p>{this.state.selectedPlace.phone}</p>
                        :
                        null}
                    </div>
                </InfoWindow>
            )
        })
    }

    nearbyBars() {
        return this.state.nearbyBars.map((bar, i) => {
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
                        url: 'https://downtownlex.com/wp-content/uploads/2018/11/map-icon-nightlife.png',
                        scaledSize: new this.props.google.maps.Size(27, 27)
                    }}
                />
            )
        })
    }

    nearbyBarsInfo() {
        return this.state.nearbyBars.map((bar, i) => {
            return (
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    key={i}
                    onClose={this.onMapClicked}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{this.state.selectedPlace.vicinity}</p>
                        {this.state.selectedPlace.rating ?
                        <p>rating: {this.state.selectedPlace.rating}</p>
                        :
                        null}
                        {this.state.selectedPlace.phone ?
                        <p>{this.state.selectedPlace.phone}</p>
                        :
                        null}
                    </div>
                </InfoWindow>
            )
        })
    }

    nearbyStores() {
        return this.state.nearbyStores.map((store, i) => {
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
                            url: 'https://cdn0.iconfinder.com/data/icons/citycons/150/Citycons_bag-512.png',
                            scaledSize: new this.props.google.maps.Size(27, 27)
                        }}
                    />
            )
        })
    }

    nearbyStoresInfo() {
        return this.state.nearbyStores.map((store, i) => {
            return (
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    key={i}
                    onClose={this.onMapClicked}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{this.state.selectedPlace.vicinity}</p>
                        {this.state.selectedPlace.rating ?
                        <p>rating: {this.state.selectedPlace.rating}</p>
                        :
                        null}
                        {this.state.selectedPlace.phone ?
                        <p>{this.state.selectedPlace.phone}</p>
                        :
                        null}
                    </div>
                </InfoWindow>
            )
        })
    }

    render() {
        return (
            <div className='map-container-div'>
                <Map 
                    google={this.props.google} 
                    zoom={14} 
                    initialCenter={{lat: 40.7618, lng: -111.8907}}
                    onClick={this.onMapClicked}
                    onReady={this.fetchPlaces}
                    style={{width: '100%', height: '100%'}}
                    center={{lat: +this.props.housing.latitude || this.state.lat, lng: +this.props.housing.longitude || this.state.lng}}>

                    <Marker 
                        onClick={this.onMarkerClick}
                        name={this.props.housing.name}
                        // rating={this.props.housing.phone}
                        phone={this.props.housing.phone}
                        vicinity={this.props.housing.address}
                        icon={{
                            url: 'http://www.clker.com/cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png',
                            scaledSize: new this.props.google.maps.Size(27, 43)
                        }} 
                    />


                        {this.nearbyFoodPlaces()}
                        {this.nearbyFoodInfo()}
        
                        {this.nearbyBars()}
                        {this.nearbyBarsInfo()}
        
                        {this.nearbyStores()}
                        {this.nearbyStoresInfo()}
            
                </Map>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        housing: state.housing
    }
}
export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer))