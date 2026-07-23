// createRouter -> creates application's router
// createWebHistory -> history mode and this is the default making url look like /login
import { createRouter, createWebHistory } from 'vue-router'


const routes = [

    {
        path: '/',
        component: () => import('@/layouts/AuthLayout.vue'),

        children: [

            {
                path: '',
                redirect: {
                    name: 'login'
                }
            },

            {
                path: 'login',
                name: 'login',
                component: () => import('@/pages/auth/Login.vue')
            },

            {
                path: 'register',
                name: 'register',
                component: () => import('@/pages/auth/Register.vue')
            }

        ]
    },


    {
        path: '/app',
        component: () => import('@/layouts/AppLayout.vue'),

        children: [

            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/pages/Dashboard.vue')
            },
            {
                path: 'ticket-list',
                name: 'ticket-list',
                component: () => import('@/pages/TicketList.vue')
            }
        ]
    }

]


const router = createRouter({

    history: createWebHistory(),

    routes

})

// default router export
export default router