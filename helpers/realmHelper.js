import React from 'react';
import Realm from 'realm';
import _ from 'underscore';

let realm = new Realm({
  schema: [{
    name: 'Locations',
    properties: {
      station: 'string',
      lat: 'float',
      lon: 'float'
    }}]
});

export default class RealmHelper {
  static saveLocation(location) {

    console.log('Realm helper save location', location);

    console.log('Saving to Realm' + realm.path);
    let id = (new Date).getTime().toString();
    console.log('ID: ' + id);

    try{
      let locations = realm.objects('Locations').filtered('station=$0', location.station);
      if (locations.length == 0){
        realm.write(() => {
          realm.create('Locations', {
            station: location.station,
            lat: location.lat,
            lon: location.lon
          })
        });
      }
    } catch(err) {
      console.log('Error saving to Realm', err);
    }
  }

  static getLocations() {
    let items = realm.objects('Locations');
    return items;
  }

  static deleteLocation(favorite) {
    console.log('Delete: ' + favorite.station);
    realm.write(() => {
      realm.delete(favorite);
    });
  }
}
