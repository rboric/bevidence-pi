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
    path: '/radnici',
    name: 'Radnici',
    component: () => import('../views/Radnici.vue'),
    meta: {
      needsUser: true
    }
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


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
