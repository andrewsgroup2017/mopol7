<template>
  <v-container fill-height justify-center align-center>
     <v-flex xs8 sm8>
      <v-card v-if="ready" class="mt-0 pt-0">
        <v-card-title>
          <img src="../assets/logo.png" style="width:40px; height:40px">
        </v-card-title>
            <v-layout justify-center align-center >
              <v-flex xs6 >
                <v-btn block color="primary" @click="scan" type="submit">login</v-btn>
              </v-flex>
            </v-layout>
      </v-card>
      <div v-if="!ready">
        <v-progress-circular
          indeterminate
          color="red"
        ></v-progress-circular>
      </div>
 
        <video v-if="showVideo" width="320" height="240" ></video>
   
    </v-flex> -->
  </v-container>
</template>
<script>
import firebase from "../store/firebase";
/* eslint-disable no-unused-vars */
export default {
  data() {
    return {
      // email: 'z.z+andrewsgroup2017@gmail.com',
      name: "asdfsadf",
      password: "asdfasdf",
      error: "",
      ready: true,
      currentCrew: [],
      showVideo: false,
      scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: []
    };
  },
  firestore() {
    return {
       currentCrew: firebase.firestore().collection('crews/'+  window.localStorage.getItem('deviceId') + '/members'),
    };
  },
  methods: {
   async scan() {
     this.showVideo = true
      const Instascan = require('instascan');
      let scanner = new Instascan.Scanner({ video: this.$refs.preview });
      scanner.addListener('scan', function (content) {
        console.log(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[1]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
  },
    getLocationOfUser(userId) {
      return new Promise(resolve => {
        var vm = this;
        var geolocationCallback = function(location) {
          resolve(location);
        };
        if (
          typeof navigator !== "undefined" &&
          typeof navigator.geolocation !== "undefined"
        ) {
          // log('Asking user to get their location')
          navigator.geolocation.getCurrentPosition(
            geolocationCallback,
            errorHandler
          );
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
          resolve("error");
        };
      });
    },
    async checkExistence(user) {
      var vm = this
      return new Promise(resolve => {

      const deviceId = window.localStorage.getItem("deviceId");
      //  var docRef =   firebase.firestore().collection("crews/"+deviceId+"/"+user.uid).where('deviceId', '==',deviceId )
      // firebase.firestore().collection("crews/"+deviceId+"/members")
vm.currentCrew
    .get()
    .then(function(querySnapshot) {
      console.log('xxxx')
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id)
            console.log(doc.data().userUID);
            console.log(user.uid);
            if(doc.data().userUID == user.uid){
                  resolve(true)
}

        });
 resolve(false)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})
},
    async addMember(user) {

      const vm = this;
      const userId = this.name
      const _loc = await this.getLocationOfUser();
      const lat = _loc.coords.latitude;
      const lng = _loc.coords.longitude;
      const db = this.$store.state.firestore;
      var deviceId = window.localStorage.getItem("deviceId");
         console.log(process.env.NODE_ENV);
         if(process.env.NODE_ENV == 'development'){
      deviceId = 'debug'

         }
      const now = new Date();
      const userUID = user.uid
      const photoURL = user.photoURL
      var lead = false
      if(this.currentCrew.length == 0 || !this.currentCrew){
        lead = true
      }
      if (deviceId !== "desktop") {
        firebase
          .firestore()
          .collection("crews/"+deviceId+'/members')
          // .collection(deviceId)
          // .doc(userUID)
          .add({
            // member
                   userId: userId,
        lat: lat,
        lng: lng,
        deviceId: deviceId,
        photoURL: photoURL,
        userUID: userUID,
        lead: lead,
        client_time: now.toString()
          })
          .then(doc => {
            console.log(doc);
            this.$store.state.firebase
              .database()
              .ref("logs")
              .push({
                eventType: "auth-login",
                device_serial: deviceId,
                client_time: new Date(),
                userId: "a.downing"
              });
          })
          .then(doc => {
            console.log(doc);

            // this.$router.replace("crewlist");
            return
          });
      }else{
        alert('Cannot join a crew from a desktop')
      }
    },
    async login(userkey) {
       //bring in all the profile information 
       this.user = this.firestore.collection('users').doc(userkey)

       //add to crew
       if(this.currentCrew.length < 1){
         this.employee.crew.lead = true
         this.currentCrew.set(this.user)
       }
       this.employee.crew.deviceId = this.deviceId
      var vm = this;
      // this.$store.state.firebase.auth().signInWithEmailAndPassword(this.email,
      var email = this.name + '+ashdowning@gmail.com'
      console.log(email)
      this.axios.post('https://us-central1-opol7dev.cloudfunctions.net/auth',{username: "adsf", password: "adsf"}, {
         headers: {
        'Content-Type': 'application/json'
         },
        //  body:{username: "adsf", password: "asdf"}
        }).then(response =>{
          console.log(response.data)
        })
      this.middleware();
    },
    middleware() {
      this.password = "";
    }
  } }
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

.theme--dark .btn:not(.btn--icon):not(.btn--flat),
.application .theme--dark.btn:not(.btn--icon):not(.btn--flat) {
  background-color: #41b883;
}
.theme--dark .card,
.application .theme--dark.card {
  background-color: #4b627b;
}
</style>
