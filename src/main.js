import { createApp } from 'vue'
import App from './App.vue'

import route from '/src/route/router'
import vuex from '/src/store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import http from "./axios/axios.js";
import api from "./axios/api.js";

const app = createApp(App);

// 暴露axios相关的全局变量
app.provide('$request', http)
app.provide('$api', api)
// vuex相关的全局变量
app.provide('$store', vuex)

app.use(route).use(vuex).use(ElementPlus).mount('#app')
