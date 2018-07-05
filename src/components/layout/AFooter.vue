<template>
  <v-footer flat dense dark style="max-height: 18px;" app>

    <v-spacer/>
    <v-spacer/>
    {{ p }} {{ displayText }}
    <i class="material-icons dark">tag_faces</i>
  </v-footer>
</template>

<script>
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

  export default {
    name: "AFooter",
    data: () => ({
      rightDrawer: false,
      currentPage: "",
      src: "../assets/logo.png",
      chatMessages: "",
      p: '',
    }),
    computed: {
      displayText() {
         var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight
      return (x * y)
    },

},
   mounted() {
     var vm = this
     vm.p = 'locating..'
  async function getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition()
  console.log(coordinates)
  vm.p = coordinates
  }
 function watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log(err)
      console.log(position)
     vm.$set(vm.p, position)

    })
  }
getCurrentPosition().then(watchPosition())


      this.getPhoto()
    },
    methods: {
      // async logOut() {
      //   try {
      //     const data = await Auth.signOut();
      //     console.log(data);
      //     this.$store.dispatch("auth/end", null);
      //      this.$store.dispatch("cognito/username", null);
      //     // this.$store.dispatch("auth/setUserId", null);
      //     // this.$store.dispatch("profile/setProfile", null)
      //     // this.$store.dispatch('timeclocks/setClocks', null)
      //     this.$router.replace("/auth/signIn");
      //   } catch (err) {
      //     this.setError(err);
      //     console.log(err);
      //     this.fireAuthNotify(this.error);
      //   }
      // },
      // logOut(err) {
      // 		this.$router.replace("/Auth/SignOut")
      // 	},
      setError(err) {
        this.error = err.message || err
      },
      // signOut: function() {
      //   Auth.signOut()
      //     .then(() => {
      //       logger.debug('sign out success')
      //       this.$router.push('/signIn')
      //     })
      //     .catch(err => this.setError(err))
      // },
      getPhoto: function() {
        // Storage.get("avatars/" + this.user.username + ".jpg").then(url => {
        // Storage.get("avatars/" + this.user.username + ".png").then(url => {
        // Storage.get("avatars/logo.png").then(url => {
        //   this.src = url
        //   console.log(this.src)
        // })
        // console.log(this.src)
      }
    }
  }
</script>

<style>
.footer {
  position: absolute;
  right: 0;
  min-height: 18px;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #0092db !important;
  text-align: center;
  -webkit-app-region: drag;
}
</style>
