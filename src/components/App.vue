<template>
  <v-app id='root' dark>
      <!-- <notifications position='bottom right' group='all' /> -->

<input type='button' value='Say hello' @click="showAndroidToast('Hello Android!')" />

      <div v-if='!mobile'>
          <sidenav />
      <v-content>
        <router-view></router-view>
      </v-content>
      <afooter/>
      </div>
      <div v-else>
      <v-content>
        <router-view></router-view>
      </v-content>
      <bottomnav/>
      </div>
          <v-snackbar
        :timeout='6000'
        :color='message.color'
        :bottom='true'
        v-model='message.visible'
      >
        <v-icon dark class='mr-2'>{{ message.icon }}</v-icon>
        {{ message.text }}
        <v-btn dark flat @click.native='message.visible = false'>
          <v-icon dark right>close</v-icon>
        </v-btn>
      </v-snackbar>
  </v-app>
</template>
<script>
import SideNav from './partials/SideNav'
//  import ComsPanel from './layout/ComsPanel'
import AFooter from './partials/AFooter'
import BottomNav from './partials/BottomNav'
import StatusWidget from './partials/StatusWidget'

// window.alert(window.location.href)
function listCookies() {
  var theCookies = window.document.cookie.split('')
  var aString = ''
  for (var i = 1; i <= theCookies.length; i++) {
    aString += i + ' ' + theCookies[i - 1] + '\n'
  }
  return aString
}

console.log(listCookies())
// import * as Instascan from '../plugins/instascan.min.js'
// const Instascan = require('../plugins/instascan.min.js')
export default {
  name: 'App',
  components: {
    sidenav: SideNav,
    afooter: AFooter,
    statuswidget: StatusWidget,
    bottomnav: BottomNav,
    // 'fab': Fab
  },
  data() {
    return {
      direction: 'left',
      fab: false,
      fixed: true,
      fling: true,
      hover: true,
      tabs: null,
      mobile: true,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }
  },
  computed: {
    // ...mapGetters({
    //    messaging
    // }),
    message() {
      return this.$store.state.messaging
    },
  },
  methods: {
    alert() {
      // alert('Clicked on alert icon')
    },
  },
  created() {
    this.$mobile = true
    var isLookBehindSupported = false
    /* eslint-disable-next-line */
    try {
      isLookBehindSupported = !!new RegExp('(?<=)')
    } catch (e) {
      console.log('mobile')
      window.localStorage.setItem('deviceId', Android.getidInfo())
      this.$mobile = true
    }
    if (isLookBehindSupported) {
      console.log('not mobile')
      window.localStorage.setItem('deviceId', 'desktop')
    } else {
      console.log('mobile2')
      this.$mobile = true
      window.localStorage.setItem('deviceId', Android.getidInfo())
    }
  },
}
</script>

  <style lang='stylus' scoped>
  .speed-dial--bottom:not(.speed-dial--absolute) {
    bottom: 40%;
    right: 5px;
  }

  .fab {
    bottom: 24px;
    right: 5px;
  }

  .vue-notification {
    padding: 10px;
    margin: 0 5px 5px;
    width: 100%;
    font-size: 14px;
    color: #ffffff;
    background: #44a4fc;
    border-left: 5px solid #187fe7;

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #e54d42;
      border-left-color: #b82e24;
    }

    &.success {
      background: #68cd86;
      border-left-color: #42a85f;
    }
  }

  .fab {
    bottom: 24px;
    right: 5px;
  }

  .v-content {
    height: 100vh;
  }

  .app {
    font-size: 16px;
  }
</style>
