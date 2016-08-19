import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';
import {PLACES_API_KEY} from '../config/settings.js';
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
          onPress={(data, details = null) => {
            var placeId =  data['place_id'];

            let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${PLACES_API_KEY}`;
            console.log(url);
            fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                  var place = responseJson.result;
                  var lat = place.geometry.location.lat;
                  var lon = place.geometry.location.lng;

                  var address = place.address_components;
                  var city = address[0].short_name;
                  var country = address[3].short_name;

                  this.props.navigator.push({
                   id: 'Tides',
                   passProps: {
                     lat: lat,
                     lon: lon,
                     city: city,
                     country: country
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

          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        />
      </View>
    )
  }
}

module.exports = Search;
