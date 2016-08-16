import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';

class FirstPage extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style={styles.text}>
          First Page
        </Text>
      </View>
    )
  }
}

module.exports = FirstPage;
