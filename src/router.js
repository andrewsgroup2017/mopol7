import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Reptiles from './views/Reptiles.vue'
import CrewList from './views/CrewList.vue'
import Profile from './views/Profile.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/crewlist',
      name: 'crewlist',
      component: CrewList
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reptiles',
      name: 'reptiles',
      component: Reptiles
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin
    // }
  ]
})
