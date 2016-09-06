import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/styles';

class About extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style={styles.aboutHeaderContainer}>
          <Text style={styles.aboutHeaderText}>
            About
          </Text>
        </View>
        <Text style={styles.aboutText}>
          {'\n\n'}
          Please note that the information given here is a FORECAST of the tidal conditions.
          {'\n\n'}
          As with all forecasts the actual conditions may vary.
          {'\n\n'}
          We take NO RESPONSIBILITY AT ALLfor any damages that may occur when using the tidal information.
          Remember, it's better to be on land and wish you were in it than in the water and wish you
          were on land.
          {'\n\n'}
          Tidal data is fetched from http://worldtides.org and eographical data is from Google.
        </Text>
      </View>
    )
  }
}

module.exports = About;
