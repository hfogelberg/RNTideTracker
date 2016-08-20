import React, { Platform } from 'react-native';
import _ from 'underscore';

module.exports = function (scene) {
    var componentMap = {
        'Tides': {
          title: 'Tides',
          id: 'Tides'
        },
        'Favorites': {
          title: 'Favorites',
          id: 'Favorites'
        },
        'Search': {
          title: 'Search',
          id: 'Search'
        },
        'About': {
          title: 'About',
          id: 'About'
        }
    }

    return componentMap[scene];
}
