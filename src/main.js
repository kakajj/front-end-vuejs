import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavBar from './components/NavBar.vue'

const app = createApp(App)
app.component('nav-bar',NavBar)
app.use(router).mount('#app')
