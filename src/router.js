import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import CrewList from './views/CrewList.vue'
import Profile from './views/Profile.vue'
import Login from './components/Login.vue'
import Login1 from './components/Login1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login1',
      name: 'login1',
      component: Login1,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/crewlist',
      name: 'crewlist',
      component: CrewList,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin
    // }
  ],
})
