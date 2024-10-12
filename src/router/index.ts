// src/routers/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "主界面",
        redirect: '/home',
        children: [
            {
                path: "home",
                name: "首页",
                meta: {
                    title: "首页"
                },
                component: () => import('~/views/Home/Home.vue')
            }
        ]
    },
    {
        path: "/dashboard/system",
        name: "系统",
        children: [
            {
                path: "about",
                name: "关于",
                meta: {
                    title: "关于页面"
                },
                component: () => import('~/views/about/About.vue'),
            },
            {
                path: "setting",
                name: "设置",
                children: [
                    // {
                    //     path: "one",
                    //     name: "第一项",
                    //     meta: {
                    //         title: "Demo页面"
                    //     },
                    //     component: () => import('~/components/Custom/index.vue'),
                    // },
                    // {
                    //     path: "demo",
                    //     name: "示例",
                    //     meta: {
                    //         title: "展示页"
                    //     },
                    //     component: () => import('~/views/ShowRouter.vue'),
                    // },
                    {
                        path: "custom",
                        name: "自定义",
                        meta: {
                            title: "轮播图页面"
                        },
                        component: () => import('~/components/Carousel/index.vue'),
                    },
                    {
                        path: 'upload_file',
                        name: '上传',
                        meta: {
                            title: "上传页面"
                        },
                        component: () => import('~/components/Upload/index.vue'),
                    },
                ]
            },
        ]
    },
    {
        name: '404',
        path: '/:catchAll(.*)',
        component: () => import(`@/views/error/404.vue`)
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const { meta: { title } } = to
    document.title = title as string || 'Title'

    next()
})

router.onError((handler) => {

})

router.beforeResolve(to => {
    if (to.meta.requiresAuth) return false
})

export default router;