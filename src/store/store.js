import Vue from 'vue'
import Vuex from 'vuex'
// import { messaging, geofire, firestore, fb } from './firebase'
import auth from './auth'
import people from './people'
import storage from './storage'
// import storage from './storage'
// import hardware from './hardware'
// import people from './people'
import common from './common'
import firebase from './firebase'

Vue.use(Vuex)
const state = {
  firebase: firebase,
  snackbar: {
    visible: false,
    text: null,
    timeout: 6000,
    multiline: false,
  },
}
const modules = {
  common: common,
  // auth: auth,
  people: people,
  storage: storage,
}

const getters = {}

const mutations = {
  showSnackbar(state, payload) {
    state.snackbar.text = payload.text
    state.snackbar.multiline = payload.text.length > 50

    if (payload.multiline) {
      state.snackbar.multiline = payload.multiline
    }

    if (payload.timeout) {
      state.snackbar.timeout = payload.timeout
    }

    state.snackbar.visible = true
  },
  closeSnackbar(state) {
    state.snackbar.visible = false
    state.snackbar.multiline = false
    state.snackbar.timeout = 6000
    state.snackbar.text = null
  },
}
const store = new Vuex.Store({
  state,
  modules,
  getters,
  mutations,
})

export default store
