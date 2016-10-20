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
import RealmHelper from '../helpers/realmHelper';

class Favorites extends Component {
  constructor(props) {
      super(props);
      this.state = {
        favorites: [],
        editMode: false
       };
  }

  componentDidMount() {
    this.getFavorites();
  }
  ''
  getFavorites() {
    let favorites = RealmHelper.getLocations();
    this.setState({favorites});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.editContainer}>
          <TouchableOpacity
            onPress={()=>{this.toggleEditMode()}}
            style={styles.pullRightItem}>
            <Image source={require('../assets/Edit.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.favoriteContainer}>
          {this.iterateFavorites()}
        </View>
      </View>
    )
  }

  toggleEditMode() {
    if (this.state.editMode == true) {
      this.setState({ editMode: false});
    } else {
      this.setState({ editMode: true});
    }
  }

  onItemPress(favorite) {
    console.log('onItemPress: ' + favorite.station);
    this.props.navigator.push({
     id: 'Tides',
     passProps: {
       lat: favorite.lat,
       lon: favorite.lon,
       station: favorite.station
     }
   });
  }

  onDeleteItem(favorite) {
    RealmHelper.deleteLocation(favorite)
    this.getFavorites();
  }


  renderDeleteIcon(favorite) {
    if(this.state.editMode == true) {
      return (
        <TouchableOpacity onPress={() => this.onDeleteItem(favorite)}>
          <Image source={require('../assets/Delete.png')}/>
        </TouchableOpacity>
      );
    }
  }

  iterateFavorites() {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favorite) => {
        return (
          <View key={favorite.station} style={styles.favoritesListItem}>
            <TouchableOpacity onPress={() => this.onItemPress(favorite)}>
              <Text style={styles.favoriteName}>{favorite.station}</Text>
            </TouchableOpacity>
            {this.renderDeleteIcon(favorite)}
          </View>
        )
      });
    }
  }
}

module.exports = Favorites;
