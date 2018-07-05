import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/storage'
import '@firebase/auth'
import '@firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyCBcvJvSl24XC-f1O23N42bgjdMcZwJrnA',
  authDomain: 'opol7dev.firebaseapp.com',
  databaseURL: 'https://opol7dev.firebaseio.com',
  projectId: 'opol7dev',
  storageBucket: 'opol7dev.appspot.com',
  messagingSenderId: '1099037767188',
})
const settings = { /* your settings... */ timestampsInSnapshots: true }
firebase.firestore().settings(settings)

// export const hardwares = firebase.firestore().collection('hardwares')
// export var storage = firebase.storage()
export default firebase
