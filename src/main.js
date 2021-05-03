import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavBar from './components/NavBar.vue'
import GoBack from './components/GoBack.vue'
import FooterComponent from './components/FooterComponent.vue'
const app = createApp(App)
app.component('nav-bar',NavBar)
app.component('go-back',GoBack)
app.component('footer-component',FooterComponent)
app.use(router).mount('#app')
