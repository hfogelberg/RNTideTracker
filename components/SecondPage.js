import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';

class SecondPage extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style={styles.text}>
          Second Page
        </Text>
      </View>
    )
  }
}

module.exports = SecondPage;
