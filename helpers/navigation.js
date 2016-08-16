import React, { Platform } from 'react-native';
import _ from 'underscore';

module.exports = function (scene) {
    var componentMap = {
        'First Page': {
            title: 'First Page',
            id: 'FirstPage'
        },
        'Second Page': {
            title: 'Second Page',
            id: 'SecondPage'
        },
        'Third Page': {
          title: 'Third Page',
          id: 'Third Page'
        }
    }

    return componentMap[scene];
}
