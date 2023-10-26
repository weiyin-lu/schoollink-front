//axios.js: axios配置

import axios from 'axios'
import {useStore} from "vuex";

const vuex = new useStore()

const http = axios.create({
    baseURL: "http://127.0.0.1:8090/schoollink", //配置 baseURL
    timeout: 3000, //配置请求超时时间
    responseType: "json"
})

// 请求拦截器
http.interceptors.request.use((config) => {
    console.log("请求拦截")
    // 让所有请求携带cookie
    config.withCredentials = true
    return config
})

// 响应拦截器
http.interceptors.response.use((response)=>{
    console.log("响应拦截")
    return response
})

export default http