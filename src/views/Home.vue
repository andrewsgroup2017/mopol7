<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <v-btn @click="snackbarButton">Create</v-btn>
        <v-btn @click="snackbarButton2">Read</v-btn>
        <v-btn @click="openSnackbar">Update</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapMutations} from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods:{
         ...mapMutations(['showSnackbar', 'closeSnackbar']),


   snackbarButton () {
        this.$emit('showSnackbar', 'You created something!', 5000, 'bottom')
      },
       snackbarButton2 () {
        this.$emit('showSnackbar', 'You read something!')
      },
         openSnackbar () {
        this.showSnackbar({text: 'You updated something!'})
      }
  }
     
}
</script>
