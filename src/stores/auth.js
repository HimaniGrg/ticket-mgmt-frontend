import { defineStore } from "pinia";
import { ref } from 'vue';
import { loginUser } from '@/services/authService';

// create a gloabl store and named that store as auth
export const useAuthStore = defineStore('auth', () => {
    // define a state
    // const user = ref({
    //     username: 'Himani',
    //     role: 'Admin'
    // });

    // const user = ref(null)

    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    const user = ref(storedUser ? JSON.parse(storedUser) : null)
    const token = ref(storedToken ? storedToken : null)

    // const login = (username) => {
    //     user.value = {
    //         username,
    //         email: `${username}@example.com`,
    //         role: 'Admin'
    //     }

    //     localStorage.setItem('user', JSON.stringify(user.value))
    // }

    const login = async (credentials) => {
        try{
            const response = await loginUser(credentials)

            user.value = response.user
            token .value = response.token

            localStorage.setItem('user', JSON.stringify(user.value))
            localStorage.setItem('token', token.value)
        } catch(error) {
            console.log(error)
            throw error
        }
    }

    const logout = () => {
        user.value = null
        token.value = null

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    // return the state and actions
    return { user, token, login, logout }
})