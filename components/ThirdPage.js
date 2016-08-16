import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import styles from '../styles/root';

class ThirdPage extends Component {
  render() {
    return (
      <View style = {styles.thirdPagecontainer}>
        <Text style={styles.text}>
          Third Page
        </Text>
      </View>
    )
  }
}

module.exports = ThirdPage;
