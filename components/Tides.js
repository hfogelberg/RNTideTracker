import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';
import styles from '../styles/root';
import {PLACES_API_KEY, TIDE_API_KEY} from '../config/settings.js';
import Moment from 'moment';

const Tides = React.createClass({

  getInitialState: function() {
    return {
      extremes: [],
      location: 'Unknown',
      locationName: 'Tidetracker',
      lat: 0,
      lon: 0
    };
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        const lon = coords.longitude;
        const lat = coords.latitude;
        const location = 'Lat: ' + lat + ', lon: ' + lon;

        this.setState({lon});
        this.setState({lat});
        this.setState({location});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.getExtremes();
  },

  reverseGeocode: function() {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lon}&key=${PLACES_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0){
          console.log(responseJson.results);
          const address = responseJson.results[0].address_components
          console.log('Address: ' + address);
          locationName = `${address[2].short_name}, ${address[5].short_name}`;
          console.log(locationName);
          this.setState({locationName});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  getExtremes: function() {
    console.log('getExtremes');

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
        const formatedDate = Moment(tide.date).format('ddd hh:mm');
        return <View key={tide.dt} style={styles.tideItem}>
          <Text style={styles.type}>{tide.type}</Text>
          <Text style={styles.height}>{roundedHeight}</Text>
          <Text style={styles.date}>{formatedDate}</Text>
        </View>
      });
    }
  },

  onSearchPress: function() {
    console.log('Search tapped');
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
        <View style={styles.searchbar}>
          <TouchableHighlight
            style={styles.searchButton}
            onPress={this.onSearchPress}>
            <Text>Search</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          { this.iterateTides() }
        </View>
      </View>
    );
  }
});

module.exports = Tides;
