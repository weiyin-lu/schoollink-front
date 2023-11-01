import {createRouter, createWebHistory} from "vue-router"
import api from "/src/axios/api"
import {ElMessage} from "element-plus";

const routes = [// 主页
    {
        path: '/', redirect: '/login'
    }, // 登录页
    {
        path: '/login', component: () => import('/src/view/Login.vue')
    }, // 首页
    {
        path: '/index',
        component: () => import('/src/view/Index.vue'),
        redirect: '/index/default',
        children: [{
            path: 'default', component: () => import('/src/components/Default.vue')
        }, {
            path: 'teacherList', component: () => import('/src/components/TeacherList.vue')
        }, {
            path: 'studentList', component: () => import('/src/components/StudentList.vue')
        }, {
            path: 'parentList', component: () => import('/src/components/ParentList.vue')
        }, {
            path: 'dicList', component: () => import('/src/components/DicList.vue')
        }, {
            path: 'noticeList', component: () => import('/src/components/NoticeList.vue')
        }, {
            path: 'gradeManage', component: () => import('/src/components/GradeManage.vue')
        },]
    },]

// 导出路由
const router = createRouter({
    history: createWebHistory(),  //开启history模式
    routes
});
// 前置路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == "/" || to.path == "/login") {
        next()
    } else {
        // 检查登录状态
        api.isLogin()
            .then(r => {
                // 已登录放行，未登录跳转回登录页面
                if (r.data.code == 200) {
                    next()
                } else {
                    ElMessage.error(r.data.msg)
                    next("/")
                }
            })
    }
})
export default router;