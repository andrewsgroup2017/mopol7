<template>
  <div id="app">
    <div>
      <input type="text"
        v-model="newReptile"
        @keyup.enter="addReptile">
      <button  @click="addReptile">
        Add Reptile
      </button>
    </div>
    <ul class="reptileList">
      <li v-for="reptile in reptiles" >
        {{ reptile.name }} -
        <button @click="deleteReptile(reptile)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import firebase from '../store/firebase';

  export default {
    name: 'app',
    data() {
      return {
        reptiles: [],
        newReptile: ''
      }
    },
    firestore() {
      return {
        reptiles: firebase.firestore().collection('reptiles'),
      }
    },
    methods: {
      addReptile: function() {
        this.$firestore.reptiles.add(
          {
            name: this.newReptile,
            timestamp: new Date()
          }
        );
        this.newReptile = '';
      },
      deleteReptile: function(reptile) {
        this.$firestore.reptiles.doc(reptile['.key']).delete();
      }
    }
  }
</script>

<style>

</style>
