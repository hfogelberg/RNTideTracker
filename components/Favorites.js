import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Navigator
} from 'react-native';
import styles from '../styles/styles';
import Realm from 'realm';

class Favorites extends Component {
  constructor(props) {
      super(props);
      this.state = { favorites: [] };
  }

  componentDidMount() {
    let realm = new Realm({
      schema: [{
        name: 'Locations',
        properties: {
          name: 'string',
          lat: 'float',
          lon: 'float'
        }}]
    });

    let favorites = realm.objects('Locations');
    this.setState({favorites});
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.iterateFavorites()}
      </View>
    )
  }

  onItemPress(favorite) {
    this.props.navigator.push({
     id: 'Tides',
     passProps: {
       lat: favorite.lat,
       lon: favorite.lon,
       name: favorite.name
     }
   });
  }

  iterateFavorites() {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favorite) => {
        return (
          <View
            key={favorite.name}
            style={styles.favoriteContainer}>
            <TouchableOpacity onPress={() => this.onItemPress(favorite)}>
              <Text style={styles.favorite}>{favorite.name}</Text>
            </TouchableOpacity>
            </View>
          )
      });
    }
  }
}

module.exports = Favorites;
