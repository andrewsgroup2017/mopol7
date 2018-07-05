import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueFirestore from 'vue-firestore'
//  import presence from './plugins/presence'
Vue.use(VueFirestore)
Vue.config.productionTip = false
Vue.prototype.$ismobile = null
store.state.firebase.auth().onAuthStateChanged(function(user) {
  store.dispatch('common/setUser', user)
  Vue.prototype.$user = user
  new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App),
  })
})