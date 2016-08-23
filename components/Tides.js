import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator
} from 'react-native';
import styles from '../styles/styles';
import {PLACES_API_KEY, TIDE_API_KEY} from '../config/settings.js';
import Moment from 'moment';
import Realm from 'realm';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tides = React.createClass({

  getInitialState: function() {
    return {
      extremes: [],
      location: '',
      name: 'Tidetracker',
      lat: 0,
      lon: 0
    };
  },

  componentDidMount: function() {
    if (this.props.lat != null) {
      this.setState({
        lon: this.props.lon,
        lat: this.props.lat,
        name: this.props.name,
        location: 'Lat: ' + this.props.lat + ', lon: ' + this.props.lon
      }, function() {
        this.savePosition();
        this.getExtremes();
      });
    } else {
      this.refreshLocation();
    }
  },

  refreshLocation: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
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
          lat: 'float',
          lon: 'float'
        }}]
    });

    let locations = realm.objects('Locations').filtered('name=$0', this.state.name);
    if (locations.length == 0){
      realm.write(() => {
        realm.create('Locations', {
          name: this.state.name,
          lat: this.state.lat,
          lon: this.state.lon
        })
      });
    }
  },

  reverseGeocode: function() {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lon}&key=${PLACES_API_KEY}`;
    console.log('reverseGeocode');
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0){
          console.log(responseJson.results[0]);
          this.setState({
            name: responseJson.results[0].name
          },
            function(){
              this.savePosition()
            }
          );
        }
      })
      .catch((error) => {
        console.log('Boom!');
        console.error(error);
      });
  },

  getExtremes: function() {
    // Don't load data for the North pole!
    if ((this.state.lat != 0) && (this.state.lon != 0)) {
      const url = `https://www.worldtides.info/api?extremes&lat=${this.state.lat}&lon=${this.state.lon}&key=${TIDE_API_KEY}`

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
    }
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
            {this.state.name}
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
