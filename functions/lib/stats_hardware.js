const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.countCreateHardware = functions.firestore
  .document('hardwares/{hardwareId}')
  .onCreate(event => {
    return updateCountHardwares(1)
  })

exports.countDeleteHardware = functions.firestore
  .document('hardwares/{hardwareId}')
  .onDelete(event => {
    return updateCountHardwares(-1)
  })

function updateCountHardwares(factor) {
  var hardwareRef = admin
    .firestore()
    .collection('stats')
    .doc('hardwares')
  var hardwareStats = { count: 1 }

  /* eslint-disable */
  return hardwareRef.get().then(doc => {
    if (doc.exists) {
      hardwareStats.count = doc.data().count + factor
    }
    hardwareRef.set(hardwareStats)
  })
}
