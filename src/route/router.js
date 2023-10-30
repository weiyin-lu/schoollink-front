import { createRouter,createWebHistory} from "vue-router"

const routes = [
    // 主页
    {
        path:'/',
        redirect: '/login'
    },
    // 登录页
    {
        path:'/login',
        component: () => import('/src/view/Login.vue')
    },
    // 首页
    {
        path:'/index',
        component: () => import('/src/view/Index.vue'),
        redirect: '/index/default',
        children: [
            {
                path: 'default',
                component: () => import('/src/components/Default.vue')
            },
            {
                path: 'teacherList',
                component: () => import('/src/components/TeacherList.vue')
            },
            {
                path: 'studentList',
                component: () => import('/src/components/StudentList.vue')
            },
            {
                path: 'parentList',
                component: () => import('/src/components/ParentList.vue')
            },
            {
                path: 'dicList',
                component: () => import('/src/components/DicList.vue')
            },
            {
                path: 'noticeList',
                component: () => import('/src/components/NoticeList.vue')
            },
        ]
    },
]

// 导出路由
const router = createRouter({
    history: createWebHistory(),  //开启history模式
    routes
});
export default router;