/* eslint-disable */
import {EventBus} from './event-bus.js'
const coolShit = 'bitch'
export default coolShit

var locationSuccess = function(location) {
     console.log(location)
    console.log('starting location update')
    var sn = 'no_serial'
    try {
      sn = device.serial
    } catch (err) {
      console.log(err)
      sn = 'no_serial'
    }
    var loc = {
      latitude: location.latitude,
      longitude: location.longitude,
      time: location.time,
      device_id: sn
    }
    EventBus.$emit('location-update', loc)
    console.log('finishing update')
    backgroundGeolocation.finish()
  }
  var locationFailure = function(error) {
    console.log('BackgroundGeolocation error', error)
    EventBus.$emit('location-error', error)
  }
function onDeviceReady() {
var configureLocationService = function() {
    console.log('device rdy')
  backgroundGeolocation.configure(locationSuccess, locationFailure, {
    interval: 20000,
    debug: true,
    startOnBoot: true,
    stopOnTerminate: false,
    stopOnStillActivity: false,
    stationaryRadius: 0,
    distanceFilter: 0,
    // maxLocations: 1000,
    // // Android only section
    // locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
    // interval: 5000,
    fastestInterval: 18000,
    activitiesInterval: 20000,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    notificationIconColor: '#FEDD1E',
    notificationIconLarge: 'mappointer_large',
    notificationIconSmall: 'mappointer_small',

  })
}
backgroundGeolocation.start()

}
document.addEventListener('deviceready', onDeviceReady, false);
