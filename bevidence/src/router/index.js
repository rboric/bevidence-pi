import Vue from 'vue'
import VueRouter from 'vue-router'
import design from "@/design";

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
    path: '/evidencija-radnih-sati',
    name: 'Evidencija_radnih_sati',
    component: () => import('../views/Evidencija_radnih_sati.vue'),
    meta: {
      needsUser: true
    }
  },
  {
    path: '/evidencija-slobodnih-dana',
    name: 'Evidencija_slobodnih_dana',
    component: () => import('../views/Evidencija_slobodnih_dana.vue'),
    meta: {
      needsUser: true
    }
  },
  {
    path: '/izracun-place',
    name: 'Izracun_place',
    component: () => import('../views/Izracun_place.vue'),
    meta: {
      needsUser: true
    }
  },
  {
    path: '/novo-poduzece',
    name: 'Novo-poduzece',
    component: () => import('../views/Novo_poduzece.vue'),
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
