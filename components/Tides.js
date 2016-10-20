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
import Moment from 'moment';

import {
  FETCHING_TIDES,
  CHECKING_LOCATION,
  GENERAL_ERROR,
  TIDE_ERROR,
  LOCATION_ERROR
} from '../constants/messages';
import {PLACES_API_KEY, TIDE_API_KEY} from '../settings';
import styles from '../styles/styles';
import RealmHelper from '../helpers/realmHelper'

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
    console.log('componentDidMount. Station: ' + this.props.station);
    var station = this.props.station;
    if (typeof station !== 'undefined') {
      station = 'Tidetracker';
    }
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
    console.log('Refresh location');
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
    console.log('Save position');
    
    let location = {
      station: this.state.station,
      lat: this.state.lat,
      lon: this.state.lon
    }

    RealmHelper.saveLocation(location);
  },

  reverseGeocode: function() {
    let url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lon}&key=${PLACES_API_KEY}`
    console.log('reverseGeocode', url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results.length > 0){
          var station = '';
          let results = responseJson.results;
          let addressComponents = results[0].address_components;

          if(addressComponents) {
            addressComponents.forEach(function(component) {
              console.log('component type: ' + component.types[0]);
              if (component.types[0] == 'postal_town') {
                station = component.short_name;
                console.log('1: ' + station);
              }
              if ((component.types[0] == 'locality') && (station=='')) {
                station = component.short_name;
                console.log('2: ' + station);
              }
              if((component.types[0] == 'administrative_area_level_1') && (station=='')) {
                station = component.short_name;
                console.log('3: ' + station);
              }
              if((component.types[0] == 'administrative_area_level_2') && (station=='')) {
                station = component.short_name;
                console.log('4: ' + station);
              }
            });
          }

          if(station == '') {
            station = 'Tidetracker';
          }

          this.setState({station});
          console.log('Station set to ' + this.state.station);

        } else {
          console.log('No result when reverse geocoding');
          station = 'Tidetracker';
        }

        if(station != '') {
          this.setState({station});
        }

      })
      .catch((error) => {
        console.log('Error reverse geocoding');
        console.error(error);

        this.setState({
          extremes: [],
          station: 'Tidetracker',
          statusText: LOCATION_ERROR
        })
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
          station: 'Tidetracker',
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
      return this.state.extremes.slice(0, 7).map((tide) => {
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
          <Text
            style={styles.title}>
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
