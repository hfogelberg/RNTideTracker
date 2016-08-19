import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator
} from 'react-native';
import styles from '../styles/root';
import {PLACES_API_KEY, TIDE_API_KEY} from '../config/settings.js';
import Moment from 'moment';
import Realm from 'realm';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tides = React.createClass({

  getInitialState: function() {
    console.log('getInitialState');
    return {
      extremes: [],
      location: '',
      locationName: 'Tidetracker',
      city: '',
      country: '',
      lat: 0,
      lon: 0
    };
  },

  componentDidMount: function() {
    console.log('componentDidMount', this.props);

    if (this.props.lat != null) {
      console.log('Has searched');
      this.setState({
        lon: this.props.lon,
        lat: this.props.lat,
        city: this.props.city,
        country: this.props.country,
        location: 'Lat: ' + this.props.lat + ', lon: ' + this.props.lon,
        locationName: this.props.city + ', ' + this.props.country
      }, function() {
        this.savePosition();
        this.getExtremes();
      });
    } else {
      this.refreshLocation();
    }
  },

  refreshLocation: function() {
    console.log('Refresh location');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        console.log('Coords: ' + coords.latitude + ', ' + coords.longitude);
        if (coords != null) {
          this.setState({
            lon: coords.longitude,
            lat: coords.latitude,
            location: 'Lat: ' + coords.latitude + ', Lon: ' + coords.longitude
          }, function() {
            this.getExtremes();
            this.reverseGeocode();
          });
        }
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  savePosition: function() {
    let realm = new Realm({
      schema: [{
        name: 'Locations',
        properties: {
          name: 'string',
          city: 'string',
          country: 'string',
          lat: 'float',
          lon: 'float'
        }}]
    });

    console.log('DB path: ', realm.path);
    console.log('Searching for locations with name ' + this.state.locationName);
    let locations = realm.objects('Locations').filtered('name=$0', this.state.locationName);
    console.log('Found locations: ' + locations);
    console.log(locations.length);
    if (locations.length == 0){
      console.log('Saving new location');
      realm.write(() => {
        realm.create('Locations', {
          name: this.state.locationName,
          city: this.state.city,
          country: this.state.country,
          lat: this.state.lat,
          lon: this.state.lon
        })
      });
    } else {
      console.log('Location already in DB');
    }
  },

  reverseGeocode: function() {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lon}&key=${PLACES_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0){
          const address = responseJson.results[0].address_components
          locationName = `${address[2].short_name}, ${address[5].short_name}`;

          if (locationName != null){
            console.log('Setting state locationName: ' + locationName);
            this.setState({
              locationName: locationName,
              city: address[2].short_name,
              country: address[5].short_name
            },
              function(){
                console.log('State is now: ' + this.state.locationName);
                console.log('Calling savePosition');
                this.savePosition()
              }
            );
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  getExtremes: function() {
    // Don't load data for the North pole!
    // if ((this.state.lat != 0) && (this.state.lon != 0)) {
      const url = `https://www.worldtides.info/api?extremes&lat=${this.state.lat}&lon=${this.state.lon}&key=${TIDE_API_KEY}`
      console.log(url);

      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          const extremes = responseJson.extremes;
          this.setState({extremes});
          this.reverseGeocode();
      })
      .catch((error) => {
        console.error(error);
      });
    // }
  },
  iterateTides: function() {
    if (this.state.extremes.length == 0) {
      return (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}>Fetchings tides ... </Text>
        </View>
      )
    } else {
      return this.state.extremes.map((tide) => {
        const roundedHeight = tide.height.toFixed(2);
        const formatedDate = Moment(tide.date).format('ddd HH:mm');
        return (
          <View key={tide.dt} style={styles.tideItem}>
            <Text style={styles.tideType}>{tide.type}</Text>
            <Text style={styles.tideHeight}>{roundedHeight}</Text>
            <Text style={styles.tideDate}>{formatedDate}</Text>
          </View>
        )
      });
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {this.state.locationName}
          </Text>
          <Text style={styles.locationText}>
            {this.state.location}
          </Text>
        </View>
        <View style={styles.body}>
          { this.iterateTides() }
        </View>
        <View
          style={styles.refreshContainer}>
          <TouchableOpacity
            onPress={()=>this.refreshLocation()} >
              <Icon name='near-me' size={32} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

module.exports = Tides;
