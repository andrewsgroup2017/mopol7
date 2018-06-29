import '@babel/polyfill'
import 'typeface-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import 'vuetify/dist/vuetify.css';
import 'babel-polyfill';
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import cordovaLoader from './cordovaLoader';
import vuetify from 'vuetify';

Vue.config.productionTip = false

Vue.use(vuetify);

cordovaLoader(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
