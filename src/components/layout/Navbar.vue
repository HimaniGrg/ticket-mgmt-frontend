<script setup>

import { Menu, Bell } from 'lucide-vue-next'
import { ref } from 'vue'

import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'


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


            <h1 class="text-xl font-semibold">
                <!-- Dashboard -->
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

                <button @click="toggleDropdown"
                    class="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-lg">

                    <div class="h-10 w-10 shrink-0 rounded-full bg-primary text-white flex items-center justify-center">
                        {{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U' }}
                    </div>

                    <div class="truncate">
                        <p class="text-sm font-medium truncate">
                            {{ auth.user?.name }}
                        </p>
                        <p class="text-xs text-muted-foreground truncate">
                            {{ auth.user?.role }}
                        </p>
                    </div>

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