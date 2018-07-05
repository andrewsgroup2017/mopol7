/* eslint-disable no-console */


/* ********* INIT ********* */

import firebase from '../store/firebase'
import store from '../store/store'
  const DATABASE_TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;
  const FIRESTORE_TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp();


  /* ********* APP ********* */


  function presence() {
    const { uid } = firebase.auth().currentUser;
    // console.log(uid)

    firebase.database().ref('.info/connected').on('value', async connected => {
      if (connected.val() === false) {
    console.log('ol')

        firebase.firestore().doc(`/users/${uid}`).set({ state: 'offline', modified: FIRESTORE_TIMESTAMP });
        return;
      }

      await firebase.database().ref(`/users/${uid}`).onDisconnect().set({ state: 'offline', modified: DATABASE_TIMESTAMP });
    //   firebase.firestore().doc(`/users/${uid}`).set({ state: 'online', modified: FIRESTORE_TIMESTAMP });

      firebase.firestore().doc(`/users/${uid}`).set({ state: 'online', modified: FIRESTORE_TIMESTAMP });
      firebase.database().ref(`/users/${uid}`).set({ state: 'online', modified: DATABASE_TIMESTAMP });
    });
  }

  function status(success = () => {}, failure = () => {}) {
    const { uid } = firebase.auth().currentUser;
    console.log(uid)

    return new Promise((resolve, reject) => {
      const unbind = firebase.firestore().doc(`/users/${uid}`).onSnapshot(
        document => {
          const { ref, exists } = document;

          const result = { data: { ...(exists ? document.data() : null) }, ref, exists, unbind };

          success(result);
          resolve(result);
        },
        err => {
          failure(err);
          reject(err);
        },
      );
    });
  }

  function monitor() {
    const { uid } = firebase.auth().currentUser;
    console.log(uid)

    firebase.firestore().collection('users')
      .where('state', '==', 'online')
      .onSnapshot(collection => {
        collection.docChanges().forEach(change => {
          let text;

          if (change.type === 'added') {
            text = `😎 ${change.doc.id} ONLINE`;
          } else if (change.type === 'removed') {
            text = `😵 ${change.doc.id} OFFLINE`;
          }

          if (text) {
            let el = document.querySelector(`#UID-${change.doc.id}`);
            if (!el) {
              el = document.createElement('div');
              el.id = `UID-${change.doc.id}`;
              if (change.doc.id === uid) {
                el.classList.add('me');
              }
              document.body.appendChild(el);
            }
            el.innerHTML = text;
          }
        });
      });
  }

  (async () => {
    // const user = await firebase.auth().signInAnonymously();
    //  const user = await firebase.auth().getCurrentUser()
    // firebase.auth().onAuthStateChanged(function(user) {
      //  var user = await firebase.auth().currentUser;

    // console.log(user)

    presence();

    // const result = await status();
    // console.log(`User ${user.uid} is ${JSON.stringify(result.data)}`);
    status(result => {
    console.log(result)
    //   console.log(result.data.state === 'online' ? '😎' : '😵', `${user.uid} ${JSON.stringify(result.data)}`);
    });

    monitor();
// })
  })();