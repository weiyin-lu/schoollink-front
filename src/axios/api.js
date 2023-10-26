//api.js: 请求方法封装

import http from "./axios.js";
//把参数序列化
//qs.stringify()是将对象 序列化成URL的形式，以&进行拼接

const api = {}
//封装方法
api.login = (dto) => {
    return http.post("/users/login",dto)
}
api.isLogin = () => {
    return http.get("/users/isLogin")
}

export default api