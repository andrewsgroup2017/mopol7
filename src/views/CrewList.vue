<template>
  <v-layout row wrap>
    <v-flex class="mt-5" xs10 offset-xs1 row >
      <v-expansion-panel >
        <v-expansion-panel-content
          v-for="(member, i) in crewList"
          :key="i"
          hide-actions
          color="#4b627b"
          class="mb-2"
        >
          <v-layout
            slot="header"
            row
          >
       <v-flex xs4 sm2 md1>
              <v-avatar
                slot="activator"
                size="64px"
              >
                <!-- eslint-disable-next-line -->
     <!-- <img :src="linka + member.userId + linkb"> -->
     <img :src="link(member)">
              </v-avatar>
            </v-flex>
            <v-flex sm4 md2  >
              <strong v-html="member.userId"></strong>
            </v-flex>
        <v-spacer></v-spacer>

            <v-flex sm2 xs2 md2 lg2>
              <v-icon class="mr-3" :color="member.clockedIn ? 'green' : 'orange'" >schedule</v-icon>

              <v-icon class="mr-3" v-if="member.lead" color="green" >people</v-icon>
            </v-flex>
          </v-layout>

          <v-card color="accent2">
            <v-card-actions class="ml-5" >
              <v-btn v-if="!member.clockedIn"  color="primary">Clock In</v-btn>
              <v-btn v-if="member.clockedIn"   color="secondary">Clock Out</v-btn>
              <v-btn color="secondary">Profile</v-btn>
              <v-btn v-if="crewList.length > 1 && member.lead"  color="warning">Drop Lead</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="logout(member)">Leave Crew</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-flex class="mt-5" xs6 offset-xs3 row>
        <v-btn class="mt-5" block color="secondary" to="login" >Add Member</v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
	// import { mapState } from 'vuex'
  import firebase from '../store/firebase'

  export default {
      name: 'CrewList',
          data: function() {
    return {
      crewList: [],
      linka: "https://firebasestorage.googleapis.com/v0/b/opol7dev.appspot.com/o/images%2Fprofile_pictures%2F",
      linkb: ".jpg?alt=media&token=d6884c00-5914-42f8-ad73-82f1ad74c8da",
    }
  },
  firestore() {
    return{
    crewList: firebase.firestore().collection('crews/'+  window.localStorage.getItem('deviceId') + '/members')
    }
  },
//      created () {
//       var deviceId = window.localStorage.getItem("deviceId");

//         if(process.env.NODE_ENV == 'development'){
//                   deviceId = 'debug'

//          }

//        this.getCrewMembers(deviceId)
// },
methods: {
    logout(member){
      this.$store.dispatch('common/logout', member)
    },
  link(member){
    //   return this.linka + member + this.linkb
    return member.photoURL
  }
}
  }
</script>
<style>
.expcard {
    /* background-color: #4b627b; */
    height: 40px;
    background-color: #4b627b;

}
.v-expansion-panel__container {
    /* background-color: #4b627b; */
    /* height: 64px; */
    background-color: #4b627b;

}
.v-expansion-panel__header {
    height: 74px;
    padding-bottom: 0px;
    padding-right: 6px;
    text-align: right;
    font-size: 20px;

    background-color: #4b627b;

}
</style>