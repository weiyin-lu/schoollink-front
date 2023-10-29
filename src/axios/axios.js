import axios from 'axios'
import {ElMessage} from "element-plus";
import router from "/src/route/router"

// 构造一个请求对象，做基本配置
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
http.interceptors.response.use(
    // 正常的响应走此
    response =>{
        return response
    },
    // 原生html-code>300（错误响应）走此
    error => {
        // 低配防盗链
        if(error.response.data.code == 1002) {
            ElMessage.error(error.response.data.msg)
            router.push("/login")
            return Promise.reject(error.response)
        }
    }
)

export default http