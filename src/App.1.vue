<template>
  <div id="app" dark>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/crewlist">CrewList</router-link>
      <v-btn color="success" @click="logout()">logout</v-btn>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { Plugins } from '@capacitor/core';



export default {
  data() {
    return {

    }
  },
  methods: {
    logout(){
      this.$store.dispatch('common/logout')
    }
  },
  async created(){
const { Device } = Plugins;
try{
  /*eslint-disable-next-line */
const info = await Device.getInfo();
this.$ismobile = true
const { EchoPlugin } = Plugins;
EchoPlugin.call('asdf')
}catch(error){
  // console.log(error)
  this.$ismobile = false
}

  }
}

</script>
  <style lang='stylus'>
  .body {
    height: 100vh;
     background-color: #35495e;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: constant(safe-area-inset-left);
    padding-left: env(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-right: env(safe-area-inset-right);
  }

  .application--wrap {
    background-color: #4B627B;

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
    height: 100vh;
  }

  .app {
    height: 100vh;
    font-size: 18px;
  }
</style>