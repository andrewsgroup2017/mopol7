<template>
  <v-app dark >
    <!-- <notifications position='bottom right' group='all' /> -->

    <!-- <input type='button' value='Say hello' @click="showAndroidToast('Hello Android!')" /> -->

    <div v-if="!mobile" >
      <sidenav fill-height app/>
      <v-content >
        <router-view></router-view>
      </v-content>
      <afooter/>
    </div>
    <div v-else>
        <router-view ></router-view>
      <bottomnav app></bottomnav>


    </div>
    <v-snackbar
      :timeout="6000"
      :color="message.color"
      :bottom="true"
      v-model="message.visible"
    >
      <v-icon dark class="mr-2">{{ message.icon }}</v-icon>
      {{ message.text }}
      <v-btn dark flat @click.native="message.visible = false">
        <v-icon dark right>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import SideNav from './components/layout/SideNav'
//  import ComsPanel from './layout/ComsPanel'
import AFooter from './components/layout/AFooter'
import BottomNav from './components/layout/BottomNav'
import StatusWidget from './components/layout/StatusWidget'
import { Plugins } from '@capacitor/core';

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
    message() {
      return this.$store.state.common.message
    },
  },
  async created() {
    console.log(process.env.NODE_ENV)
    var deviceId = 'debug';
    this.$mobile = true
    this.mobile = true
    var isLookBehindSupported = false
    /* eslint-disable-next-line */
    try {
      isLookBehindSupported = !!new RegExp('(?<=)')
    } catch (e) {
      console.log('mobile')
    this.$mobile = true
      this.mobile = true
      // window.localStorage.setItem('deviceId', Android.getidInfo())
      this.$mobile = true
      const { Filesystem, FilesystemDirectory, FilesystemEncoding } = Plugins;
   deviceId = await Filesystem.readFile({
    path: 'andrews/andrews.txt',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
    }
    if (isLookBehindSupported) {
      console.log('not mobile')

    } else {
      console.log('mobile2')
      this.$mobile = true
      this.mobile = true
      const { Filesystem, FilesystemDirectory, FilesystemEncoding } = Plugins;

   deviceId = await Filesystem.readFile({
    path: 'andrews/andrews.txt',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  })

      window.localStorage.setItem('deviceId', deviceId)
    }
  },
  methods: {
    alert() {
      // alert('Clicked on alert icon')
    },
  },
}
</script>

  <style lang='stylus'>


  .application--wrap {
    // background-color: #4B627B;
    background-color: #35495e;
    //     padding-bottom: 100px;    /* height of footer */
  }

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
  }

  .app {
    // height: 100vh;
    // background: #fafafa;
    font-size: 18px !important;
  }

</style>