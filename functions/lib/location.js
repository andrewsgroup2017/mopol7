
exports.locationUpdate = functions.https.onRequest((req, res) => {
    console.info(req.body)
    console.log(functions.config())
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
      return s4() + s4()
    }
    switch (req.body.action) {
      //sets the tablet id not the user
      case 'auth': {
        console.log(req.body)
        let tid = req.body.user + '_' + admin.database.ServerValue.TIMESTAMP
        // res.send({ error: false, trackid: tid })
        res.send({ error: false })
        break
      }
      case 'addtrack': {
        console.log(req.body)
        // let tid = req.body.track + '_' + admin.database.ServerValue.TIMESTAMP
        let tid = s4()
        // let tid = req.body.user + '_' + admin.database.ServerValue.TIMESTAMP
        res.send({ error: false, trackid: tid })
        break
      }
      case 'addpos':
        console.log('addpos trackid = ', req.body.trackid)
        // res.send({ error: false, trackid: 1 })
        res.send({ error: false })
        break

      default: {
        console.log('no action')
        res.send({ error: true, errormsg: 'noaction' })
        break
      }
      // res.send({ error: false })
      // console.log('req inc')
    }
  })
