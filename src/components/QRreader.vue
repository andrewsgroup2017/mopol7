<template>
<div>
                <qrcode-reader
                :active="active"
                @init="onInit"
                @decode="onDecode">
                <b>{{ overlay }}</b>
              </qrcode-reader>
</div>


</template>

<script>
import QrcodeReader from './QRReader'
import Vue from 'vue'
Vue.component('qrcode-reader', QrcodeReader)

export default {
    mouted() {
        // component mounted
    },
    data() {
        return {
              overlay: '',
                  active: null,


        }
    },
    methods: {
    checkedOutList() {
      console.log('hi')
      return []
    },
    async submit() {
      console.log(this.selected)
      var contents = {}
      for (let item of this.selected) {
        contents = await this.checkOut(item.id, null)
        console.log(contents)
      }
    },
    remove() {
      console.log(this.selected)
    },
    next() {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    },
    selectThirdTab() {
      this.selectedTab = 'tab-3'
    },
    onDecode(content) {
      console.log(content)
      // this.updateCheckOutList(content)
    },
    onLocate(points) {
      console.log(points)
    },
    updateCheckOutList(url) {
      this.alert = ''
      if (this.loading) {
        return
      }
      var id = url.split('hardware/')[1]
      var item = this.items.find(x => x.id === id)
      console.log(item)
      if (item && item !== 'undefined') {
        if (item.assigned_to) {
          console.log('problem ')
          this.alert = 'Asset already checked out'
          id = null
          item = null
          return
        }
        if (this.idList.indexOf(id) !== -1) {
          this.alert = 'Item already added'
          id = null
          item = null
          return
        }
        if (id && this.idList.indexOf(id) === -1) {
          this.idList.push(id)
          console.log(this.idList)
          this.request({
            pagination: this.serverPagination,
            filter: this.idList,
            list: 'qr',
          })
        }
      }
    },
    async onInit(promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        console.log('dookie')
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
        this.loading = false
      }
    },
    checkIn(assetId, assignedTo) {
      this.items = []
      this.qrItems = []
      this.idList = []
      if (!assignedTo) {
        console.log('not gonna hapn capnxxx')
        return
      }
      //   this.$api
      // .post('snipeit/hardware/checkin', { assigned_asset: assetId })
      // this.$http
      //   .post('http://47.219.112.177:1880/api/snipeit/hardware/checkin', { assigned_asset: assetId })
      //   .then(response => {
      //     console.log(response)
      //     this.selected = null
      //     this.request({
      //       pagination: this.serverPagination,
      //       filter: this.filter
      //     }).then(console.log('ready'))
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/checkinHardware', {
          params: { assigned_asset: assetId },
        })
        .then(response => {
          console.log(response)
          this.$router.go(this.$router.currentRoute)
        })
        .catch(error => {
          console.error(error)
        })
    },
    async checkOut(assetId, assignedTo) {
      this.idList = []
      this.qrItems = []
      this.loading = true
      let assId = ''
      try {
        if (assignedTo) {
          console.log('not gonna hapn capn')
          return
        }
        if (!assetId.id) {
          assId = assetId
        } else {
          assId = assetId.id
        }
        console.log(assId)
        console.log(this.$store.getters.profile['custom:snipeit'])
        this.$http
          // eslint-disable-next-line
          .get(process.env.LAMBDA_API + '/checkoutHardware', {
            params: {
              assigned_asset: assId,
              assigned_user: this.$store.getters.profile['custom:snipeit'],
            },
          })
          .then(response => {
            console.log(response)
            this.$router.go(this.$router.currentRoute)
          })
          .catch(e => {
            console.log(e)
          })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    request({ pagination, filter, list }) {
      this.loading = true
      if (list === 'qr') {
        this.qrItems = []
      }
      if (list === 'main') {
        this.items = []
      }
      if (list === 'both') {
        this.items = []
        this.qrItems = []
      }
      console.log(process.env.LAMBDA_API)
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getHardware')
        .then(response => {
          this.serverPagination = pagination
          this.serverPagination.rowsNumber = response.data.total
          for (var item of response.data.rows) {
            item.model = item.model.name
            item.category = item.category.name
            if (item.location) {
              item.location = item.location.name
            } else {
              item.location = 'needs location'
            }
            if (item.status_label) {
              item.status_label = item.status_label.name
            }
            if (item.assigned_to) {
              item.assigned_to = item.assigned_to.name
            }
            item.checky = 'xxx'
            if (!filter) {
              this.items.push(item)
            } else {
              for (let id of filter) {
                if (id === item.id) {
                  console.log('qritems')
                  item.search = 'found'
                  this.qrItems.push(item)
                }
              }
            }
          }
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          // we tell QTable to exit the "loading" state
          console.log('sugar tits ', error)
          this.loading = false
        })
    },
  },
}

</script>
