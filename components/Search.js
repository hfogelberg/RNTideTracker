import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';

class Search extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style={styles.text}>
          Search Page
        </Text>
      </View>
    )
  }
}

module.exports = Search;
