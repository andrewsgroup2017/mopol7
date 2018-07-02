<template>
<v-container fill-height justify-center align-center>
  <!-- <v-layout row > -->
    <v-flex xs8 sm8>
      <!-- <h1> &nbsp</h1> -->
      <v-card class='mt-0 pt-0' v-if='ready'>
          <v-card-title class='primary'>
            <h4 style='color:white'>Andrews</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent='login'>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>User ID</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field  name='email' v-model='email' label='email' value='Input text'></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Password</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field  name='password' type='password' v-model='password' label='password' value='Input text'></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn type='submit'>login</v-btn>
                <!-- <v-snackbar v-if='error' :timeout='timeout' :top='true' :multi-line='mode === 'multi-line'' :vertical='mode === 'vertical'' v-model='error'>
                  {{ text }}
                  <v-btn class='pink--text' flat @click.native='error = false'>Close</v-btn>
                </v-snackbar> -->
              </form>
              {{data}}
        </v-card-text>
            <ul class="reptileList">
      <li v-for="reptile in data" >
        {{ reptile.name }} -
        <button @click="deleteReptile(reptile)">
          Remove
        </button>
      </li>
    </ul>
      </v-card>
         <div v-if='!ready'>
                <v-progress-circular
      indeterminate
      color='red'
    ></v-progress-circular>
        </div>

    </v-flex>
  <!-- </v-layout> -->
  </v-container>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  mounted() {
    this.$auth.logout()
    this.$auth.state({
      forward: '/crewlist',
      redirect: '/login',
      then: user => {},
      catch: () => {
        this.ready = true
      },
    })
  },
  data() {
    return {
      email: 'asdf@asdf.com',
      password: 'asdfasdf',
      error: '',
      ready: false,
    }
  },
  computed: {},
  firestore() {
    return {
      data: this.$store.state.database.child('crews'),
    }
  },
  methods: {
    getLocationOfUser(userId) {
      return new Promise(resolve => {
        var vm = this
        var geolocationCallback = function(location) {
          resolve(location)
        }
        if (
          typeof navigator !== 'undefined' &&
          typeof navigator.geolocation !== 'undefined'
        ) {
          // log('Asking user to get their location')
          navigator.geolocation.getCurrentPosition(
            geolocationCallback,
            errorHandler
          )
        } else {
          // log(
          //   'Your browser does not support the HTML5 Geolocation API, so this demo will not work.'
          // )
        }

        var errorHandler = function(error) {
          if (error.code == 1) {
            // log('Error: PERMISSION_DENIED: User denied access to their location')
          } else if (error.code === 2) {
            // log(
            //   'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached'
            // )
          } else if (error.code === 3) {
            // log("Error: TIMEOUT: Calculating the user's location too took long")
          } else {
            // log('Unexpected error code')
          }
          resolve('error')
        }
      })
    },
    // vm.$store.state.geofire
    //   .set(username, deviceId, [latitude, longitude])
    //   .then(function() {
    //     log(
    //       'Current user ' +
    //         userId +
    //         "'s location has been added to GeoFire"
    //     )

    //     // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
    //     // remove their GeoFire entry
    //     firebaseRef
    //       .child(username)
    //       .onDisconnect()
    //       .remove()

    //     log(
    //       'Added handler to remove user ' +
    //         username +
    //         ' from GeoFire when you leave this page.'
    //     )
    //   })
    //   .catch(function(error) {
    //     log('Error adding user ' + username + "'s location to GeoFire")
    //   })
    /*************/
    /*  HELPERS  */
    /*************/
    /* Logs to the page instead of the console */
    // function log(message) {
    //   console.log(message)
    //   // var childDiv = document.createElement('div')
    //   // var textNode = document.createTextNode(message)
    //   // childDiv.appendChild(textNode)
    //   // document.getElementById('log').appendChild(childDiv)
    // }

    async addMember() {
      // console.log(this.email)
      // var userId = this.email

      const userId = this.email.substring(this.email.indexOf('@') + 1)
      const _loc = await this.getLocationOfUser()

      const lat = _loc.coords.latitude
      const lng = _loc.coords.longitude

      const db = this.$store.state.firestore
      const deviceId = window.localStorage.getItem('deviceId')

      const now = new Date()
      var member = {
        userId: userId,
        lat: lat,
        lng: lng,
        deviceId: deviceId,
        client_time: now.toString(),
      }
      // console.log(member.loc)
      console.log(member)

      if (deviceId !== 'desktop' || 'debug') {
        db
          .collection('crews')
          // .doc(deviceId)
          // .collection('members')
          .add({
            member,
          })
          .then(doc => {
            console.log(doc)
            this.$store.state.database.child('logs').push({
              eventType: 'auth-login',
              device_serial: deviceId,
              client_time: new Date(),
              userId: 'a.downing',
            })
          })
      }
    },
    async login() {
      var vm = this
      // const loc = await vm.getLocationOfUser()

      this.$auth.loginWithEmailAndPassowrd({
        email: this.email,
        password: this.password,
        result: user => {
          vm.addMember()
          vm.email = ''
          vm.password = ''
          this.ready = true
        },
        error: error => {
          console.log(error)
          // this.$refs.snackbar.open()
          // this.ready = true
          // this.error = error.message
        },
      })
      this.middleware()
    },
    middleware() {
      this.password = ''
    },
  },
}
</script>
<style scoped>
.push-down {
  margin-top: 15px;
}

.icon {
  height: 18px;
  width: 18px;
  margin-right: 8px;
}
</style>

