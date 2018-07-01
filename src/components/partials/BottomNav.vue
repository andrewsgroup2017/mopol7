<template>
    <v-app toolbar>
      <v-bottom-nav :value="true" dark app>
        <v-btn flat to="/">
        <span>Schedule</span>
          <v-icon>schedule</v-icon>
        </v-btn>
        <v-btn flat to="/crewlist">
        <span>Crew</span>
          <v-icon>people</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-app>
</template>

<script>
// import { Plugins } from '@capacitor/core'
// const { Geolocation } = Plugins

  export default {
    name: "BottomNav",

}
</script>

<style>
.v-bottom-nav {

  background-color: #41b883 !important;
}
</style>
