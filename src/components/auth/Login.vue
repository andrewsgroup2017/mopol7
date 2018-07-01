
<template>
<v-container fill-height justify-center align-center>
  <!-- <v-layout row > -->
    <v-flex xs8 sm8>
      <!-- <h1> &nbsp;</h1> -->
      <v-card class="mt-0 pt-0" v-if="ready">
          <v-card-title class="primary">
            <h4 style="color:white">Andrews</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>User ID</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field  name="email" v-model="email" label="email" value="Input text"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Password</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field  name="password" type="password" v-model="password" label="password" value="Input text"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn type="submit">login</v-btn>
                <v-snackbar v-if="error" :timeout="timeout" :top="true" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="error">
                  {{ text }}
                  <v-btn class="pink--text" flat @click.native="error = false">Close</v-btn>
                </v-snackbar>
              </form>
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
/* eslint-disable no-unused-vars */
export default {
    mounted() {
        this.$auth.logout()
        this.$auth.state({
            forward: '/crewlist',
            redirect: '/login',
            then: (user) => {

            },
            catch: () => {
                this.ready = true;
            }
        });
    },
    data() {
        return {
            email: 'asdf@asdf.com',
            password: 'asdfasdf',
            error: '',
            ready: false
        }
    },
    computed: {},
    firebase() {
    return {
      data: this.$store.state.database.child("crews")
    };
  },
    methods: {

      addMember(){
        // console.log(this.email)
        var userId = this.email
    var db = this.$store.state.firestore
    const deviceId = window.localStorage.getItem('deviceId')
    console.log(deviceId)
    var d = new Date()
    var member = {
      userId: userId,
      owner: true,
      client_time: d.toString()
    }
    db.collection('crews').doc(deviceId).collection('members').add({
        member
    }).then(doc => {
        console.log(doc)
          this.$store.state.database.child("logs").push({

          eventType: "auth-login",
          device_serial: deviceId,
          client_time: new Date(),
          userId: "a.downing"


      });
        // window.alert(doc)
        // var tagsCollection = doc.collection('tags');

        // // Begin a new batch
        // var batch = db.batch();

        // // Set each document, as part of the batch
        // tags.forEach(t => {
        //     var ref = tagsCollection.doc(t.id.toString());
        //     batch.set(ref, t);
        // })

        // // Commit the entire batch
        // return batch.commit();
    })
},
        login() {

this.addMember(this.email)


            // this.$auth.loginWithEmailAndPassowrd({
            //     email: this.email,
            //     password: this.password,
            //     result: (user) => {
            //       //         // this.$firebaseRefs.data.onDisconnect().cancel();
            //       //          this.Item.push();
            //       //   Member: new Member(this.$store.state.database.child('crews')).init()
            //       //  this.Member.push();

            //         this.ready = true;

            //     },
            //     error: (error) => {
            //      console.log(error)
            //      // this.$refs.snackbar.open()
            //         // this.ready = true;
            //         // this.error = error.message
            //     }
            // })
            // this.middleware()
        },
        // register() {
        //     this.ready = false
        //     this.$auth.registerWithEmailAndPassword({
        //         email: this.email,
        //         password: this.password,
        //         result: (user) => {
        //             this.ready = true;
        //             //console.log("User Email : " + user.email)
        //         },
        //         error: (error) => {
        //             this.error = error.message
        //             this.ready = false;
        //             this.$refs.snackbar.open()
        //         }
        //     });
        // },
        middleware() {
            this.password = ''
        },
        // signInGoogle() {
        //     this.ready = false
        //     this.$auth.signInWithGoogle({
        //         result: (result) => {
        //             // This gives you a Google Access Token. You can use it to access the Google API.
        //             // console.log("Token : " + result.credential.accessToken)
        //             // The signed-in user info.
        //             //console.log("User Email : " + result.user.email)
        //             this.ready = true
        //         },
        //         error: (error) => {
        //             // Error
        //             this.error = error.message
        //             this.ready = false;
        //             this.$refs.snackbar.open()
        //         }
        //     })
        // },
        // signInFacebook() {
        //     this.ready = false
        //     this.$auth.signInWithFacebook({
        //         result: (result) => {
        //             //console.log("Token : " + result.credential.accessToken)
        //             //console.log("User Email : " + result.user.email)
        //             this.ready = true
        //         },
        //         error: (error) => {
        //             this.error = error.message
        //             this.ready = false;
        //             this.$refs.snackbar.open()
        //         }
        //     })
        // },
        // signInTwitter() {
        //     this.ready = false
        //     this.$auth.signInWithTwitter({
        //         result: (result) => {
        //             //console.log("Token : " + result.credential.accessToken)
        //             //console.log("User Email : " + result.user.email)
        //             //console.log(result.user)
        //             this.ready = true
        //         },
        //         error: (error) => {
        //             this.error = error.message
        //             this.ready = false;
        //             this.$refs.snackbar.open()
        //         }
        //     })
        // },
        // signInGithub() {
        //     this.ready = false
        //     this.$auth.signInWithGithub({
        //         result: (result) => {
        //             //console.log("Token : " + result.credential.accessToken)
        //             //console.log("User Email : " + result.user.email)
        //             this.true = true
        //         },
        //         error: (error) => {
        //             this.error = error.message
        //             this.ready = false;
        //             this.$refs.snackbar.open()
        //         }
        //     })
        // }
    }
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

