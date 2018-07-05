<template>
  <v-container fill-height justify-center align-center>
    <!-- <v-layout row > -->
    <v-flex xs8 sm8>
      <!-- <h1> &nbsp</h1> -->
      <v-card v-if="ready" class="mt-0 pt-0">
        <v-card-title>
          <!-- <h4 style="color:white">Andrews</h4> -->
          <img src="../assets/images/logo.png" style="width:40px; height:40px">
          {{currentCrew}}
        </v-card-title>
        <v-card-text>
          <form autocomplete="off">
           <v-text-field
      v-model="name"
      label="Name"
      value=""
      required
      autocomplete="new-name"
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
      autocomplete="new-password"
    ></v-text-field>
            <v-layout justify-center align-center >
              <v-flex xs6 >
                <v-btn block color="primary" @click="login" type="submit">login</v-btn>
              </v-flex>
            </v-layout></form>
            <!-- <v-snackbar v-if='error' :timeout='timeout' :top='true' :multi-line='mode === 'multi-line'' :vertical='mode === 'vertical'' v-model='error'>
                  {{ text }}
                  <v-btn class='pink--text' flat @click.native='error = false'>Close</v-btn>
                </v-snackbar> -->
        </v-card-text>

      </v-card>
      <div v-if="!ready">
        <v-progress-circular
          indeterminate
          color="red"
        ></v-progress-circular>
      </div>

    </v-flex>
  <!-- </v-layout> -->
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
    };
  },
  mounted() {
  // Binding Collections
  // this.$binding("currentCrew", firebase.firestore().collection('crews/'+  window.localStorage.getItem('deviceId') + '/members'))
  // .then((currentCrew) => {
  //   console.log(currentCrew) // => __ob__: Observer
  // })
  },
  firestore() {
    return {
       currentCrew: firebase.firestore().collection('crews/'+  window.localStorage.getItem('deviceId') + '/members'),
    };
  },
  methods: {
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

      console.log(user.uid)
      })
//       docRef.get().then(function(doc) {
//         console.log(doc)
//         if(doc){
//               console.log("Document data:");
//         resolve(false)
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//         resolve(true)
//     }
//     // if (doc.exists) {
//     //     console.log("Document data:", doc.data());
//     //     resolve(false)
//     // } else {
//     //     // doc.data() will be undefined in this case
//     //     console.log("No such document!");
//     //     resolve(true)
//     // }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
//         resolve(false)
// });
// })
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
    async login() {
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

      // this.axios.post('https://us-central1-opol7dev.cloudfunctions.net/auth', {usename: email, password: this.password}).then((response) => {
      //   console.log(response.data)
      //   })
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, this.password)
      //   .then(async function(firebaseUser) {
      //     console.log(firebaseUser.user);
      //     var exists = await vm.checkExistence(firebaseUser.user)
      //     if(!exists){ vm.addMember(firebaseUser.user)}else{
      //       alert('already in this crew')
      //     }
      //       vm.email = "";
      //       vm.password = "";
      //       vm.ready = true;
      //      if(firebaseUser.user.photoURL){
      //       vm.$router.replace("crewlist");

      //       }else{
      //       vm.$router.replace("profile")
      //       }
      //     // console.log(this.member);
      //   })
      //   .catch(function(error) {
      //     console.log(error.message);
      //             vm.email = "";
      //       vm.password = "";
      //       vm.ready = true;
      //   });

      this.middleware();
    },
    middleware() {
      this.password = "";
    }
  }
};
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
  background-color:#4B627B
}
</style>
