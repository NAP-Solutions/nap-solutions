import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AIReceptionist from '../pages/AIReceptionist.vue'
import OutboundAgent from '../pages/OutboundAgent.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/ai-receptionist', component: AIReceptionist },
  { path: '/outbound-agent', component: OutboundAgent },
  { path: '/privacy-policy', component: PrivacyPolicy },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
