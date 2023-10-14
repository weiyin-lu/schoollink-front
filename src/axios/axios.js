//axios.js: axios配置

import axios from 'axios'

const http = axios.create({
    baseURL:"http://localhost:8090", //配置 baseURL
    timeout:3000, //配置请求超时时间
})


// 请求拦截器
http.interceptors.request.use((config) => {
    console.log("请求拦截")
    return config
})

// 响应拦截器
http.interceptors.response.use((response)=>{
    console.log("响应拦截")
    return response
})

export default http