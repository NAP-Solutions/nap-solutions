import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/privacy-policy', component: PrivacyPolicy },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
