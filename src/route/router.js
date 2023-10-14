import { createRouter,createWebHistory} from "vue-router"

const routes = [
    {
        path:'/',
        redirect: 'login'
    },
    {
        path:'/login',
        component: () => import('/src/components/HelloWorld.vue')
    },
]

// 导出路由
const router = createRouter({
    history: createWebHistory(),  //开启history模式
    routes
});

export default router;