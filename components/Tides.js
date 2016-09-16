import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  Navigator,
  Modal
} from 'react-native';
import styles from '../styles/styles';
import {PLACES_API_KEY, TIDE_API_KEY} from '../settings';
import Moment from 'moment';
import Realm from 'realm';
import {FETCHING_TIDES, CHECKING_LOCATION, GENERAL_ERROR,TIDE_ERROR, LOCATION_ERROR} from '../constants/messages';

const Tides = React.createClass({

  getInitialState: function() {
    return {
      extremes: [],
      location: '',
      station: 'Tidetracker',
      lat: 0,
      lon: 0,
      modalVisible: false,
      warning: '',
      statusText: CHECKING_LOCATION
    };
  },

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  componentDidMount: function() {
    if (this.props.lat != null) {
      this.setState({
        lon: this.props.lon,
        lat: this.props.lat,
        location: 'Lat: ' + this.props.lat.toFixed(3) + ', lon: ' + this.props.lon.toFixed(3),
        station: this.props.station
      }, function() {
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
        console.log('Refresh location. Coords. lat: ' + coords.latitude + ', lon: ' + coords.longitude);
        if (coords != null) {
          this.setState({
            lon: coords.longitude,
            lat: coords.latitude,
            location: 'Lat: ' + coords.latitude.toFixed(3) + ', lon: ' + coords.longitude.toFixed(3)
          }, function() {
            this.getExtremes();
            this.reverseGeocode();
          });
        }
      },
      (error) => this.setState({statusText: LOCATION_ERROR}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  savePosition: function() {
    let realm = new Realm({
      schema: [{
        name: 'Locations',
        properties: {
          station: 'string',
          lat: 'float',
          lon: 'float'
        }}]
    });

    console.log('Realm file path: ' + realm.path);

    let locations = realm.objects('Locations').filtered('station=$0', this.state.station);
    if (locations.length == 0){
      realm.write(() => {
        realm.create('Locations', {
          station: this.state.station,
          lat: this.state.lat,
          lon: this.state.lon
        })
      });
    }
  },

  reverseGeocode: function() {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0){
          let results = responseJson.results;

          let addressComponents = results[0].address_components;
          var station = '';
          var town = '';
          addressComponents.forEach(function(component) {
            if (component.types[0] == 'locality') {
              station = component.short_name;
            }
            if (component.types[0] == 'postal_town') {
              town = component.short_name;
            }
          })

          if (station == '') {
            station = town;
          }
          this.setState({station});
        } else {
          console.log('No result when reverse geocoding');
        }
      })
      .catch((error) => {
        console.log('Error revers geocoding');
        console.error(error);
      });
  },

  getExtremes: function() {
    // Don't load data for the North pole!
    this.setState({statusText: FETCHING_TIDES})
    if ((this.state.lat != 0) && (this.state.lon != 0)) {
      const url = `https://www.worldtides.info/api?extremes&lat=${this.state.lat}&lon=${this.state.lon}&key=${TIDE_API_KEY}`
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          var station;
          console.log(responseJson);
          var extremes = responseJson.extremes;
          if (this.state.station != ''){
            station = this.state.station
          } else {
            station = responseJson.station;
          }
          var warning = responseJson.copyright;
          this.setState({extremes, warning});

          if ((typeof station !== 'undefined')) {
            if(station) {
              this.setState({station});
            } else {
              this.reverseGeocode();
            }
          } else {
            this.reverseGeocode();
          }
      })
      .catch((error) => {
        this.setState({
          extremes: [],
          statusText: TIDE_ERROR
        })
        console.error(error);
      });
    }
  },
  iterateTides: function() {
    if (this.state.extremes.length == 0) {
      return (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}
                numberOfLines={4}>
            {this.state.statusText}
          </Text>
        </View>
      )
    } else {
      return this.state.extremes.map((tide) => {
        const roundedHeight = tide.height.toFixed(2);
        const formatedDate = Moment(tide.date).format('ddd HH:mm');
        return (
          <View key={tide.dt} style={styles.tideItem}>
            {this.renderIcon(tide.type)}
            <View>
              <Text style={styles.tideType}>{tide.type}</Text>
              <Text style={styles.tideDate}>{formatedDate}</Text>
            </View>
            <Text style={styles.tideHeight}>{roundedHeight}</Text>
          </View>
        )
      });
    }
  },

  renderIcon: function(type) {
    if (type == 'High') {
      return <Image
                source={require('../assets/HighTide.png')}
                style={styles.icon}/>
    } else {
      return <Image
                source={require('../assets/LowTide.png')}
                style={styles.icon}/>;
    };
  },

  newFavorite: function() {
    console.log('NewFavorite');
    this.savePosition();
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {this.state.station.toUpperCase()}
          </Text>
          <Text style={styles.locationText}>
            {this.state.location}
          </Text>
        </View>

        <View
          style={styles.pullContainer}>
          <TouchableOpacity
            onPress={()=>this.refreshLocation()}
            style = {styles.pullRightItem} >
              <Image
                source={require('../assets/GPSDevice.png')}
                style={styles.icon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.tidesContainer}>
          { this.iterateTides() }
        </View>

        <View
          style={styles.pullContainer}>
          <TouchableOpacity
            onPress={()=>this.newFavorite()}
            style = {styles.pullLeftItem} >
              <Image
                source={require('../assets/NewFavorite.png')}
                style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

module.exports = Tides;
