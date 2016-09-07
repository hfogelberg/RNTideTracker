import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/styles';
import {PLACES_API_KEY} from '../settings.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import _ from 'underscore';

class Search extends Component {

  render() {
    return (
      <View style={styles.placesSearch} >
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          style={styles.container}
          onPress={(data, details = null) => {
            var placeId =  data['place_id'];

            let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${PLACES_API_KEY}`;
            console.log(url);
            fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                  var place = responseJson.result;
                  console.log(place.name);
                  var lat = place.geometry.location.lat;
                  var lon = place.geometry.location.lng;

                  this.props.navigator.push({
                   id: 'Tides',
                   passProps: {
                     lat: lat,
                     lon: lon,
                     station: place.name
                   }
                 });
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: PLACES_API_KEY,
            language: 'en'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        />
      </View>
    )
  }
}

module.exports = Search;
