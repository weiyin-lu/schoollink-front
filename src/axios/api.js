//api.js: 请求方法封装

import http from "/src/axios/axios.js"
import qs from 'qs'
//把参数序列化
//qs.stringify()是将对象 序列化成URL的形式，以&进行拼接

const api = {}
//封装login方法
api.test = () => {
    let response = http.get("/weiyin/dictionary/hello")
    return response
}

export default api