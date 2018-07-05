<template>
  <v-app dark >
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
      <!-- <snackbarstore/>
            <v-snackbar
              :text="text"
              :timeout="timeout"
              :top="y === 'top'"
              :bottom="y === 'bottom'"
              :left="x ==='left'"
              :right="x === 'right'"
              :multi-line="mode === 'multi-line'"
              :vertical="mode === 'vertical'"
              v-model="snackbar">
              {{text}}
              <v-btn flat dark @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
             <router-view v-on:showSnackbar="showSnackbar"/> -->
  </v-app>
</template>
<script>
  import SnackbarStore from '@/components/SnackbarStore'

import SideNav from './components/layout/SideNav'
//  import ComsPanel from './layout/ComsPanel'
import AFooter from './components/layout/AFooter'
import BottomNav from './components/layout/BottomNav'
import StatusWidget from './components/layout/StatusWidget'


export default {
  name: 'App',
  components: {
    sidenav: SideNav,
    afooter: AFooter,
    statuswidget: StatusWidget,
    bottomnav: BottomNav,
    snackbarstore: SnackbarStore,
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
        snackbar: false,
        text: '',
        timeout: null,
        y: 'top',
        x: null,
        mode: null,
      transition: 'slide-y-reverse-transition',
    }
  },
      methods: {
        
      showSnackbar (text, timeout = 3000, yPos = 'top', xPos, mode) {
        this.text = text
        this.timeout = timeout
        this.y = yPos
        this.x = xPos
        this.mode = mode
        this.snackbar = true
      }
    }

}
</script>

  <style lang='stylus'>
  .application--wrap {
    // background-color: #4B627B;
    background-color: #35495e;
    // padding-bottom: 100px;    /* height of footer */
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