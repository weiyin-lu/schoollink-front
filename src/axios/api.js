//api.js: 请求方法封装

import http from "./axios.js";

//封装方法
const api = {}
// user
api.login = (dto) => {
    return http.post("/users/login",dto)
}
api.isLogin = () => {
    return http.get("/users/isLogin")
}
api.logout = () => {
    return http.get("/users/logout")
}
api.getInfo = () => {
    return http.get("/users/getInfo")
}
api.register = (dto) => {
    return http.post("/users/register",dto)
}
// admin
api.addGradeForStudent = (id,value) => {
    return http.get("/admins/addGradeForStudent/" + id + "/" + value)
}
api.addGradeForTeacher = (id,value) => {
    return http.get("/admins/addGradeForTeacher/" + id + "/" + value)
}
api.removeParent = () => {
    return http.get("/admins/removeParent")
}
api.removeStudent = () => {
    return http.get("/admins/removeStudent")
}
api.removeTeacher = () => {
    return http.get("/admins/removeTeacher")
}
// dictionary
api.addCode = (dto) => {
    return http.post("/dictionary/addCode",dto)
}
api.getCode = (value) => {
    return http.get("/dictionary/getCode/" + value)
}
api.updateCode = (dto) => {
    return http.get("/dictionary/updateCode" + dto)
}
// notice
api.addNotice = (dto) => {
    return http.post("/notices/createNotice",dto)
}
api.showNoticeByCreator = () => {
    return http.get("/notices/showNoticeByCreator")
}
api.showNoticeByCondition = (value) => {
    return http.get("/notices/showNoticeByCondition/" + value)
}
// teacher
api.getTeachersList = () => {
    return http.get("/teachers/getTeachersList")
}


export default api