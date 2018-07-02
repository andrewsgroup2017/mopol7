import * as googleFirebase from 'firebase'
import * as GeoFire from 'geofire'
import config from './config'
require('firebase/firestore')

class Firebase {
  constructor() {
    googleFirebase.initializeApp(config)
    return googleFirebase
  }
}

export let firebase = new Firebase()

export let geofire = new GeoFire(
  firebase
    .database()
    .ref()
    .push()
)
