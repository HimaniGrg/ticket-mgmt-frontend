import { defineStore } from "pinia";
import { ref } from 'vue';

// create a gloabl store and named that store as auth
export const useAuthStore = defineStore('auth', () => {
    // define a state
    // const user = ref({
    //     username: 'Himani',
    //     role: 'Admin'
    // });

    // const user = ref(null)

    const storedUser = localStorage.getItem('user')

    const user = ref(storedUser ? JSON.parse(storedUser) : null)

    const login = (username) => {
        user.value = {
            id: 1,
            username,
            email: `${username}@example.com`,
            role: 'Admin'
        }

        localStorage.setItem('user', JSON.stringify(user.value))
    }

    const logout = () => {
        user.value = null

        localStorage.removeItem('user')
    }

    // return the state and actions
    return { user, login, logout }
})