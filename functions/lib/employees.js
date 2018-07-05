// const key = {
//   "type": "service_account",
//   "project_id": "opol7dev",
//   "private_key_id": "8f229e43955a89993af820d9c85445d9c876799d",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDX77WcUAUw2CQG\nIKTO5F2xXTmAQtZzNEdb2no9hR4oxkZLOuvnFuulFb7DFArx7LeGibcrANlPQGnY\n2oqFDq7aSXscOFEgNdjSlVd994x8GAXzRw8TzQR+KoJFfTQuRttB50jMOFltPjix\nQdlAkqM72E32QfHOhVoMcja+aQpPogpXZeJE6/0O1FwCfdXKt3xQTsrPoH1XNUDV\nKkpmOrovezf/nU936EPkwmEoAQsKf2g1CJrwaNvzenfOpQ/UaG5CfFx9hjZqU0no\nDZsqstUPimrp8C2mJNDYG/LM+rS1rJ78xE41Zsqddvd26of7hltkPdo0qXyXk3sC\nkIN+kg/FAgMBAAECggEAZUBnPfZfmLmgmqbv4HtAW4xFDBlLCRX4Z9+X9gTXUXM3\nPstQFjmvIOeDXWGmiC3hGFq24pkxTHH9r8s5rI5n+r791QurLplRI90W+1/6Ja32\nDE7DiRtXAfnYv9CniRN8d/iFMA00EX9dgfBIeHjJxaP1WoUtZxMsWC2t8ba7OP77\nobNrULXg1MY+rmvRzQ3M/Tl1Qc1pPZA2CPcYS9muGZB90w3PJSxCG6KKlgKW8Soo\nhBg7Rdl8oVtxEi5S2nvEGyWUjNWVf/igk560QJ115eRzJB+/o9ERcG4tfKDNy7TU\nXN+shucop5APKmH7q9172oeglEr8NxSsgSgB81FmOQKBgQDwfE4sX1k9Wjh0cbkI\nD7MX/vUFI4Om3/oNqn+YVY68xalzIXWI0jciUdQjDGs53B1grdUiITa/HsQtI/9f\neAU03GDkQ8FqI2FAcaN5iu4g8yZiqQ1hVO0eY+tM84uO4x4bjLJiIkiFcvb5EZ+U\nDCP1llBCFj8DerUiKuc4u8nnpwKBgQDl3fdc0x6KXg/BNK2K7adr+TE7OTpRyL4c\nUHYzv5TuX+Jm6ziJF6joD2sETiix1+sncu9Mo8UtayER6+oTHzxU+3YXuGSgYOLN\n1HTlRB4FLFltVRryzu/6BKEpcyX8FPJQTpBejJ1ZYwJLlWJciR/r8ad1MpAfjtt8\nGVoxH/T6swKBgDXB88+jeNVoJ5qQGWad69D/Y1JEwBc7ljAb3u30ojW8kcZ0wktV\ngpGfbSZwjj+e3spP0YcRmaVbgUr98wYqVC+e2+Hq63+IbSL0xDBVSCoBcKE5XQ5W\n57KVb3ICNz43svFBoFajh0adjmva7qsvk5JAiaxcQLXMZlU+9fUOtXGdAoGBALqN\nvmezX6HkXNzsp7uMzMewYegytcYSKVhJZOTyoygi4VetpyB79zT+7ld8J0LOfaZy\nfQuyDiCiRSCKWlpSi2BdBKaTm/cdKnTp7ET1V3fTWnCFFW3hzJkYkMNXFIjVZyMN\n39UcQcd9tysofb+j+ig+4y0WcClsg2zgFnav/N5JAoGBALO680raldOE81hNXuBB\n1GWrc8mU+00C3RrEMteCuZGkOHAU+MFKlZc7ds8dkO1KrgzrlAFXZJRgx0tudd0K\n3M+WHTL2Y/s62iXRtTc5hMU3anrT09mK+mBc5lBWQBOAZwkZm+zopLaLG5tgguxc\nZ1K4RIjBWOAIJejjsmh5YzE+\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-d6b0s@opol7dev.iam.gserviceaccount.com",
//   "client_id": "117369191225834586694",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://accounts.google.com/o/oauth2/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d6b0s%40opol7dev.iam.gserviceaccount.com"
// }
var serviceAccount = require('./serviceKey.json')
const firebase = require('firebase') // client SDK
firebase.initializeApp({
  apiKey: 'AIzaSyCBcvJvSl24XC-f1O23N42bgjdMcZwJrnA',
  authDomain: 'opol7dev.firebaseapp.com',
})
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://opol7dev.firebaseio.com',
})
const employeeLoginEvent = functions.database
  .ref('/logs/{pushId}')
  .onCreate(snapshot => {
    const snapval = snapshot.val()
    console.log('event: ', snapval)
    if (snapval.userId && snapval.userId !== 'unknown') {
      if (snapval.eventType === 'auth-logout') {
        functions.firestore
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
        functions.firestore
          .collection('currentUsers')
          .doc(snapval.userId)
          .set({
            device_serial: snapval.device_serial,
            name: snapval.userId.displayName,
            userId: snapval.userId,
            lat: snapval.lat,
            lng: snapval.lng,
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
    const userStatusFirestoreRef = functions.firestore.doc(
      `status/${context.params.uid}`
    )
    // console.log(change)
    // console.log(eventStatus)
    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    return change.after.ref.once('value').then(statusSnapshot => {
      const status = statusSnapshot.val()
      // console.log(status, eventStatus)
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

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
})

// const basicAuthRequest = require('request');
const app = express()
app.use(bodyParser.json())
app.use(cookieParser(['array', 'of', 'secrets']))

// on future requests, the UID can be found using `req.cookies['__session'].uid`

app.post('/auth', function(req, res, next) {
  if (!req.body.email) return res.status(400).json({ error: 'missing email' })
  if (!req.body.password)
    return res.status(400).json({ error: 'missing password' })

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL) // don't persist auth session
    .then(function() {
      var email = req.body.username + '+ashdowning@gmail.com'
      return firebase.auth().signInWithEmailAndPassword(email, 'asdfasdf')
    })
    .then(user => {
      // https://firebase.google.com/docs/reference/js/firebase.User
      let uid = user.uid

      // set cookie with UID or some other form of persistence
      // such as the Authorization header
      res.cookie('__session', { uid: uid }, { signed: true, maxAge: 3600 })
      res.set('cache-control', 'max-age=0, private') // may not be needed. Good to have if behind a CDN.
      // res.send('You have successfully logged in')
      res.render(200, { data: user })

      // return firebase.auth().signOut() //clears session from memory
    })
    .catch(err => {
      next(err)
    })
})

// /**
//  * Authenticate the provided credentials.
//  * TODO(DEVELOPER): In production you'll need to update this function so that it authenticates with your own credentials system.
//  * @returns {Promise<boolean>} success or failure.
//  */
// function authenticate(username, password) {
//   // For the purpose of this example use httpbin (https://httpbin.org) and send a basic authentication request.
//   // (Only a password of `Testing123` will succeed)
//   // const authEndpoint = `https://httpbin.org/basic-auth/${username}/Testing123`;
//   const creds = {
//     auth: {
//       user: username,
//       pass: password,
//     },
//   }
//   console.log(creds)
//   return new Promise(resolve => {
//     return resolve(true)
//     // basicAuthRequest(authEndpoint, creds, (error, response) => {
//     //   if (error) {
//     //     return reject(error);
//     //   }
//     //   const statusCode = response ? response.statusCode : 0;
//     //   if (statusCode === 401) { // Invalid username/password
//     //     return resolve(false);
//     //   }
//     //   if (statusCode !== 200) {
//     //     return reject(Error('invalid response returned from ', authEndpoint, ' status code ', statusCode));
//     //   }
//     //   return resolve(true);
//     // });
//   })
// }
module.exports = {
  // api2,
  app,
  onUserStatusChanged,
  employeeLoginEvent,
}
