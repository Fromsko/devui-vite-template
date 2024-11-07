import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "IndexHomeView",
        component: () => import('@/views/portal/index.vue'),
        children: [
            {
                path: "api",
                name: "apiView",
                redirect: "HelpList",
                children: [
                    {
                        name: "HelpList",
                        path: "",
                        component: () => import("@/components/Api/Grid.vue")
                    },
                    {
                        name: "HelpDocs",
                        path: ":id",
                        meta: {
                            title: "接口页面"
                        },
                        component: () => import("@/components/Api/NotePage.vue"),
                    }
                ]
            },
            {
                path: "auth",
                name: "authView",
                component: () => import('@/views/auth/index.vue')
            },
        ],
    },
    {
        path: "/dashboard/system",
        name: "系统",
        component: () => import("@/views/dashboard/index.vue"),
        children: [
            {
                path: "about",
                name: "首页",
                meta: {
                    title: "关于页面"
                },
                component: () => import('@/views/dashboard/about/index.vue'),
            },
            {
                path: "setting",
                name: "设置",
                children: [
                    {
                        path: "custom",
                        name: "自定义",
                        meta: {
                            title: "轮播图页面"
                        },
                        component: () => import('@/components/Carousel/index.vue'),
                    },
                    {
                        path: 'upload',
                        name: '上传',
                        meta: {
                            title: "上传页面"
                        },
                        component: () => import('@/components/Upload/index.vue'),
                    }
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
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    next();
});

router.onError((handler) => {

})

router.beforeResolve(to => {
    // if (to.meta.requiresAuth) return false
})

export default router;