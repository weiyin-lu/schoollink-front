import http from "./axios.js";

//封装请求路径
const api = {}
// user
api.login = (dto) => {
    return http.post("/users/login", dto)
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
    return http.post("/users/register", dto)
}
api.getRole = () => {
    return http.get("/users/getRole")
}
// admin
api.addGradeForStudent = (id, value) => {
    return http.get("/admins/addGradeForStudent/" + id + "/" + value)
}
api.addGradeForTeacher = (id, value) => {
    return http.get("/admins/addGradeForTeacher/" + id + "/" + value)
}
api.removeParent = (value) => {
    return http.get("/admins/removeParent/" + value)
}
api.removeStudent = (value) => {
    return http.get("/admins/removeStudent/" + value)
}
api.removeTeacher = (value) => {
    return http.get("/admins/removeTeacher/" + value)
}
// dictionary
api.getKey = () => {
    return http.get("/dictionary/getKey")
}
api.addCode = (dto) => {
    return http.post("/dictionary/addCode", dto)
}
api.getCode = (value) => {
    return http.get("/dictionary/getCode/" + value)
}
api.updateCode = (dto) => {
    return http.get("/dictionary/updateCode" + dto)
}
// notice
api.addNotice = (dto) => {
    return http.post("/notices/createNotice", dto)
}
api.showNoticeByCreator = () => {
    return http.get("/notices/showNoticeListByCreator")
}
api.showNoticeByCondition = (value) => {
    return http.get("/notices/showNoticeListByCondition/" + value)
}
// teacher
api.getTeachersList = () => {
    return http.get("/teachers/getTeachersList")
}
api.getTeachersByUnique = (value) => {
    return http.get("/teachers/getTeachersByUnique/" + value)
}
api.updateTeacher = (dto) => {
    return http.post("/teachers/updateTeacher", dto)
}
// student
api.getStudentList = () => {
    return http.get("/students/getStudentsList")
}
api.getStudentListByGrade = (value) => {
    return http.get("/students/getStudentsList/" + value)
}
api.getStudentsByUnique = (value) => {
    return http.get("/students/getStudentsByUnique/" + value)
}
api.setParent = (id, value) => {
    return http.get("/students/setParent/" + id, "/" + value)
}
api.updateStudent = (dto) => {
    return http.post("/students/updateStudent", dto)
}
// parent
api.getParentsList = () => {
    return http.get("/parents/getParentsList")
}
api.getParentByUnique = (value) => {
    return http.get("/parents/getParentByUnique/" + value)
}
api.getOwnStudent = (value) => {
    return http.get("/parents/getStudentList/" + value)
}
api.updateParent = (dto) => {
    return http.post("/parents/updateParent", dto)
}
// 导出
export default api