export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const SET_USER = 'SET_USER'
export const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'
export const LOGOUT = 'LOGOUT'
export const SET_USERLIST = 'SET_USERLIST'
import firebase from './firebase'
const deviceId = window.localStorage.getItem('deviceId')

const state = {
  message: {
    visible: false,
    text: '',
    icon: '',
    color: '',
  },
  user: null,
  isLoggedIn: false,
  userList: [],
  snackbar: {
    visible: false,
    text: null,
    timeout: 6000,
    multiline: false
  }
}

// getters
const getters = {
  message: state => state.message,
  user: state => state.user,
  userList: state => state.userList,
}
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
  [SET_USERLIST](state) {
    /* eslint-disable-next-line */

      firebase.firestore().collection('crews/'+  deviceId +'/members')
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
           state.userList.push(doc)
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

  },
  [LOGOUT](state, member) {
    /* eslint-disable-next-line */
    // firebase.auth().signOut().then(function() {
      console.log('logging out ', member)
      firebase.firestore().collection('crews/'+ deviceId +'/members').doc(member['.key']).delete()
      if(firebase.firestore().collection('crews/'+ deviceId +'/members').length < 1){
        state.user = null,
        state.isLoggedIn = false,
        state.userList = []
      }else{
        commit(SET_USERLIST)
      }
      /* eslint-disable-next-line */
    // }, function(error) {
    //   // An error happened.
    //   console.log(error)
    // });

  },
  [SHOW_MESSAGE](state, message) {
    /* eslint-disable-next-line */
    message.visible = true
    state.message = message
  },
  [SET_USER](state, user) {
    /* eslint-disable-next-line */
    state.user = user
  },
  [SET_ISLOGGEDIN](state, bool) {
    /* eslint-disable-next-line */
    state.isLoggedIn = bool
  },
}

const actions = {
  logout({ commit }, member) {
    commit(LOGOUT, member)
  },
  showMessage({ commit }, message) {
    commit(SHOW_MESSAGE, message)
  },
  setUser({ commit }, user) {
    if (user) {
      commit(SET_ISLOGGEDIN, true)
      commit(SET_USER, user)
      var myConnectionsRef = firebase
        .database()
        .ref('users/connections/')
      var lastOnlineRef = firebase
        .database()
        .ref('users/lastOnline/'+user.uid)

      var connectedRef =firebase.database().ref('.info/connected')
      console.log(firebase.database.ServerValue.TIMESTAMP)

      connectedRef.on('value', function(snap) {
        if (snap.val() === true) {
          var con = myConnectionsRef.push()
          con.onDisconnect().remove()
          con.set(true)
          lastOnlineRef
            .onDisconnect()
            .set(firebase.database.ServerValue.TIMESTAMP)
        }
      })
    } else {
      commit(SET_ISLOGGEDIN, false)
      commit(SET_USER, user)
    }
  },
}

// mutations

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}