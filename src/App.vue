<template>
   <v-app>
    <v-app toolbar>
      <main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </main>

      <v-bottom-nav :value="true" class="white" app>
        <v-btn flat to="/">
        <span>Schedule</span>
          <v-icon>schedule</v-icon>
        </v-btn>
        <v-btn flat to="/about">
        <span>Crew</span>
          <v-icon>people</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-app>
  </v-app>
</template>

<script>
/*eslint-disable */
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
var locationSuccess = function(location) {
     console.log(location)
}
  var locationFailure = function(error) {
    console.log('BackgroundGeolocation error', error)
    EventBus.$emit('location-error', error)
  }
function onDeviceReady() {
console.log(' app says d is rdy')
  backgroundGeolocation.configure(locationSuccess, locationFailure, {
    interval: 10000,
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
    fastestInterval: 10000,
    activitiesInterval: 10000,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    notificationIconColor: '#FEDD1E',
    notificationIconLarge: 'mappointer_large',
    notificationIconSmall: 'mappointer_small',

  })
backgroundGeolocation.start()

}
document.addEventListener('deviceready', onDeviceReady, false);


export default Vue.extend({
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    route(path) {
      alert('no router! ' + path);
    },
  },
  components: {
    HelloWorld
  },
});
</script>

<style>
body {
  background: #fafafa;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
}
</style>
