import React, {Component} from 'react';
import Realm from 'realm';

class LocationsObject extends Component {
  export const realm = new Realm({
    schema: [{
      name: 'Locations',
      properties: {
        name: 'string',
        lat: 'float',
        lon: 'float'
      }}]
  });
}

module.exports = LocationsObject;
