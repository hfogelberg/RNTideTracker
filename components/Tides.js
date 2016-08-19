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
import Realm from 'realm';

const Tides = React.createClass({

  getInitialState: function() {
    return {
      extremes: [],
      location: '',
      locationName: 'Tidetracker',
      lat: 0,
      lon: 0
    };
  },

  componentDidMount: function() {
    console.log('componentDidMount', this.props);

    if (this.props.lat != null) {
      console.log('Has searched');

      const lat = this.props.lat;
      const lon = this.props.lon;
      const location = 'Lat: ' + this.props.lat + ', lon: ' + this.props.lon;
      const locationName = this.props.city + ', ' + this.props.country;

      this.setState({lon});
      this.setState({lat});
      this.setState({location});
      this.setState({locationName});

    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          if (coords != null) {
            const lon = coords.longitude;
            const lat = coords.latitude;
            const location = 'Lat: ' + lat + ', lon: ' + lon;

            this.setState({lon});
            this.setState({lat});
            this.setState({location});
          }
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }

    this.savePosition();
    this.getExtremes();
  },

  savePosition: function() {
    console.log('Save position');
    console.log('DB path: ', db.path)

    let realm = new Realm({
      schema: [{
        name: 'Locations',
        properties: {
          name: 'string',
          lat: 'float',
          lon: 'float'
        }}]
    });

    realm.write(() => {
      realm.create('Locations', {
        name: this.state.locationName,
        lat: this.state.lat,
        lon: this.state.lon
      })
    });

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
            this.setState({locationName});
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
      </View>
    );
  }
});

module.exports = Tides;
