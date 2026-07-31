import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                redirect: { name: 'login' }
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
        meta: { requiresAuth: true },
        children: [
            {
                path: 'users',
                name: 'user-management',
                component: () => import('@/pages/UserManagementView.vue'),
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/pages/Dashboard.vue')
            },
            {
                path: 'ticket-list',
                name: 'ticket-list',
                component: () => import('@/pages/TicketList.vue')
            },
            {
                path: 'ticket-create',
                name: 'ticket-create',
                component: () => import('@/pages/TicketCreate.vue')
            },
            {
                path: 'tickets/:id',
                name: 'ticket-detail',
                component: () => import('@/pages/TicketDetailView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth) {
        // If we have a token stored but user object hasn't loaded into memory yet, fetch it
        if (auth.isAuthenticated && !auth.user) {
            try {
                await auth.fetchUser()
            } catch (error) {
                auth.logout()
                return { name: 'login' }
            }
        }

        // If still not authenticated, redirect to login
        if (!auth.isAuthenticated) {
            return { name: 'login' }
        }
    }
})

export default router