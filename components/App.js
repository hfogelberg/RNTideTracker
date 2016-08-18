'use strict'

import React, { Component } from 'react';
import { DeviceEventEmitter, Navigator, Text, TouchableOpacity, View } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EventEmitter } from 'fbemitter';
import navigationHelper from '../helpers/navigation';
import styles from '../styles/root';
import Menu from './Menu';
import Tides from './Tides';
import Favorites from './Favorites';
import Search from './Search';
import About from './About';

let _emitter = new EventEmitter();

class App extends Component {
    componentDidMount() {
      var self = this;

      // Don't show warnings in the simulator
      console.disableYellowBox = true;

      _emitter.addListener('openMenu', () => {
          self._drawer.open();
      });

      _emitter.addListener('back', () => {
          self._navigator.pop();
      });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close()
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Tides',
                        title: 'Tides',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                />
            </Drawer>
        );
    }

    _renderScene(route, navigator) {
        switch (route.id) {
          case 'Tides':
            return (
              <Tides navigator={navigator} {...route.passProps}/>);
          case 'Favorites':
            return (<Favorites navigator={navigator} />);
          case 'Search':
            return (<Search navigator={navigator} {...route.passProps} />);
          case 'About':
            return (<About navigator={navigator} />);
        }
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
      return (
          <TouchableOpacity
              style={styles.navBarLeftButton}
              onPress={() => {_emitter.emit('openMenu')}}>
              <Icon name='menu' size={25} color={'white'} />
          </TouchableOpacity>
      )
    },

    RightButton(route, navigator, index, navState) {
        return null
    },

    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        )
    }
}

export default App;
