import { createRouter,createWebHistory} from "vue-router"

const routes = [
    {
        path:'/',
    },
    {
        path:'/login',
        component: () => import('/src/components/Login.vue')
    },
    {
        path:'/tableList',
        component: () => import('/src/components/TableList.vue')
    },
]

// 导出路由
const router = createRouter({
    history: createWebHistory(),  //开启history模式
    routes
});

export default router;