<template>
  <div >
    <div>
      <input type="text"
        v-model="newReptile"
        @keyup.enter="addReptile">
      <button  @click="addReptile">
        Add Reptile
      </button>
    </div>
    <ul class="reptileList">
      <li v-for="person in Persons" >
        {{ person.name }} -
        <button @click="deleteReptile(person)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Person from './../models/Person'

export default {
  mounted() {
    this.$auth.check({
      then: user => {
        // retrieve the logged-in user
      },
      catch: () => {
        // user is not logged in
      },
    })
  },
  firestore() {
    return {
      Persons: this.$store.state.firestore.collection('Persons'),
    }
  },
  data() {
    return {
      username: '',
      Person: new Person(
        this.$store.state.firestore.collection('Persons')
      ).init(),
    }
  },
  methods: {
    add() {
      this.Person.add()
        .then(success => {
          this.Person.name = ''
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    remove(e) {
      this.Person.delete(e['.key'])
        .then(() => {
          console.log('Done')
        })
        .catch(error => {
          console.log(error.message)
        })
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.reptileList {
  list-style: none;
}
</style>
