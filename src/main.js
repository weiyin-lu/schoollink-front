import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import route from '/src/route/router'
import vuex from '/src/store/store'
import api from '/src/axios/api'

const app = createApp(App);

app.use(route).use(vuex).mount('#app')
