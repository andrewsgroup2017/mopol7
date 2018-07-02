const functions = require('firebase-functions')
const admin = require('firebase-admin')
// admin.initializeApp()
const firestore = admin.firestore()

const logEmployeeEvent = function(snapval) {
  firestore
    .collection('userhistory')
    .doc(event.userId)
    .set({
      event: snapval,
    })
    .then(doc => {
      console.log('Document successfully written!')
      return doc
    })
    .catch(error => {
      console.error('Error writing document: ', error)
      return error
    })
}
exports.employeeAddedToCrewEvent = functions.firestore
  .document('crews')
  .onWrite((change, context) => {
    const snapval = snapshot.val()
    console.log(snapval)
    if (snapval.userId && snapval.userId !== 'unknown') {
      if (snapval.eventType === 'auth-logout') {
        // const userStatusFirestoreRef = firestore.doc(
        //   `currentUsers/${snapval.event.user}`
        // )
        firestore
          .collection('currentUsers')
          .doc(snapval.userId)
          .delete()
          .then(() => {
            console.log('Document successfully deleted!')
            return { message: 'currentUser-removed' }
          })
          .catch(error => {
            console.error('Error removing document: ', error)
            return error
          })
      } else if (snapval.eventType === 'auth-login') {
        firestore
          .collection('currentUsers')
          .doc(snapval.userId)
          .set({
            device_serial: snapval.device_serial,
            client_time: snapval.client_time,
          })
          .then(doc => {
            console.log('Document successfully written!')
            return doc
          })
          .catch(error => {
            console.error('Error writing document: ', error)
            return error
          })
      }
    }
    logEmployeeEvent(snapval)
  })

const employeeLoginEvent = functions.database
  .ref('/logs/{pushId}')
  .onCreate((snapshot, context) => {
    const snapval = snapshot.val()
    console.log(snapval)
    // if (snapval.userId && snapval.userId !== 'unknown') {
    if (snapval.userId) {
      if (snapval.eventType === 'auth-logout') {
        // const userStatusFirestoreRef = firestore.doc(
        //   `currentUsers/${snapval.event.user}`
        // )
        firestore
          .collection('currentUsers')
          .doc(snapval.userId)
          .delete()
          .then(() => {
            console.log('Document successfully deleted!')
            return { message: 'currentUser-removed' }
          })
          .catch(error => {
            console.error('Error removing document: ', error)
            return error
          })
      } else if (snapval.eventType === 'auth-login') {
        firestore
          .collection('currentUsers')
          .doc(snapval.userId)
          .set({
            device_serial: snapval.device_serial,
            client_time: snapval.client_time,
          })
          .then(doc => {
            console.log('Document successfully written!')
            return doc
          })
          .catch(error => {
            console.error('Error writing document: ', error)
            return error
          })
      }
    }
  })

const onUserStatusChanged = functions.database
  .ref('/status/{uid}')
  .onUpdate((change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val()

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`)
    // console.log(change)
    // console.log(eventStatus)
    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    return change.after.ref.once('value').then(statusSnapshot => {
      const status = statusSnapshot.val()
      console.log(status, eventStatus)
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.last_changed > eventStatus.last_changed) {
        return null
      }

      // Otherwise, we convert the last_changed field to a Date
      eventStatus.last_changed = new Date(eventStatus.last_changed)

      // ... and write it to Firestore.
      return userStatusFirestoreRef.set(eventStatus)
    })
  })
// [END presence_sync_function]
// [END presence_sync_function]

module.exports = {
  // api2,
  onUserStatusChanged,
  employeeLoginEvent,
}
