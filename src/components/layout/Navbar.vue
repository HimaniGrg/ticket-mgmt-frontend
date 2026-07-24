<script setup>

import { Menu, Bell } from 'lucide-vue-next'
import { ref } from 'vue'

import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const emit = defineEmits([
    'toggle-sidebar'
])

const dropdownOpen = ref(false)

const toggleDropdown = () => {

    dropdownOpen.value = !dropdownOpen.value
}

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
    auth.logout()

    router.push({ name: 'login' })
}
</script>


<template>
    <header class="h-16 border-b bg-background flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
            <button @click="$emit('toggle-sidebar')" class="p-2 rounded-lg hover:bg-accent cursor-pointer">
                <Menu />
            </button>


            <h1 class="text-xl font-semibold">
                Dashboard
            </h1>
        </div>



        <!-- Right -->

        <div class="flex items-center gap-4">


            <button class="relative p-2 rounded-lg cursor-pointer hover:bg-accent">

                <Bell />

                <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>

            </button>



            <ThemeToggle />



            <div class="relative">

                <button @click="toggleDropdown" class="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-lg">

                    <div class="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center">
                        {{ auth.user?.username.charAt(0).toUpperCase() }}
                    </div>


                    <span>
                        {{ auth.user?.username }}
                    </span>


                </button>



                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 rounded-lg border bg-card shadow-lg">


                    <RouterLink to="/app/profile" class="block px-4 py-2 hover:bg-accent">
                        Profile
                    </RouterLink>


                    <RouterLink to="/app/settings" class="block px-4 py-2 hover:bg-accent">
                        Settings
                    </RouterLink>


                    <button class="w-full text-left px-4 py-2 hover:bg-accent" @click="logout">
                        Logout
                    </button>


                </div>


            </div>

        </div>


    </header>


</template>