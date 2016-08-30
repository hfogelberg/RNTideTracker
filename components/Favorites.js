import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';
import styles from '../styles/styles';
import Realm from 'realm';

let realm = new Realm({
  schema: [{
    name: 'Locations',
    properties: {
      name: 'string',
      lat: 'float',
      lon: 'float'
    }}]
});

class Favorites extends Component {
  constructor(props) {
      super(props);
      this.state = { favorites: [] };
  }

  componentDidMount() {
    this.getFavorites();
  }


  getFavorites() {
    let favorites = realm.objects('Locations');
    this.setState({favorites});
  }

  render() {
    return (
      <View style={styles.favoriteContainer}>
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

  onDeleteItem(favorite) {
    console.log('Delete: ' + favorite.name);

    realm.write(() => {
      realm.delete(favorite);
    });

    this.getFavorites();
  }

  iterateFavorites() {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favorite) => {
        return (
          <View key={favorite.name} style={styles.favoritesListItem}>
            <TouchableOpacity onPress={() => this.onItemPress(favorite)}>
              <Text style={styles.favoriteName}>{favorite.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onDeleteItem(favorite)}>
              <Image source={require('../assets/Delete.png')}/>
            </TouchableOpacity>
          </View>
        )
      });
    }
  }
}

module.exports = Favorites;
