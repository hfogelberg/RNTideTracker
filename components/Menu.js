import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import Button from 'react-native-button';
import styles from '../styles/menu'

var _navigate;
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(['Tides', 'Search', 'Favorites', 'About'])
      });
    }

    _renderMenuItem(item) {
      return(
        <Button style={styles.menuItem} onPress={()=> this._onItemSelect(item)}>{item}</Button>
      );
    }

    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
          <View style={styles.container} >
            <ListView
              style={styles.favoritesList}
              dataSource={this.state.dataSource}
              renderRow={(item) => this._renderMenuItem(item)} />
          </View>
        );
    }
}

module.exports = Menu;
