import Vue from 'vue'
import VueRouter from 'vue-router'
import localuser from "@/localuser";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/poduzeca',
    name: 'Poduzeca',
    component: () => import('../views/Poduzeca.vue'),
    meta: {
      needsUser: true
    }
  },
  {
    path: '/poduzeca/:compURL',
    name: 'PoduzecaDetails',
    component: () => import('../views/PoduzecaDetails.vue'),
    meta: {
      needsUser: true
    },
    props: true
  },
  {
    path: '/poduzeca/:compURL/radnici/:wURL',
    name: 'RadniciDetails',
    component: () => import('../views/RadniciDetails.vue'),
    meta: {
      needsUser: true
    },
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      needsUser: true
    },
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/passwordreset',
    name: 'PasswordReset',
    component: () => import('../views/PasswordReset.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
