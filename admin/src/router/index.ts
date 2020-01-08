import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import User from '../views/User.vue'
import Course from '../views/Course.vue'
import Episode from '../views/Episode.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/user', name: 'user', component: User },
      { path: '/course', name: 'course', component: Course },
      { path: '/episode', name: 'episode', component: Episode }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
