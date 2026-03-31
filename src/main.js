import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'
import { initSamePageLinkScroll } from './composables/gsapScrollTo'

createApp(App).use(router).mount('#app')

const cleanupSamePageScroll = initSamePageLinkScroll()

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanupSamePageScroll?.()
  })
}
