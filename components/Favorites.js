import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';

class Favorites extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style={styles.text}>
          Favorites
        </Text>
      </View>
    )
  }
}

module.exports = Favorites;
