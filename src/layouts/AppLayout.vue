<script setup>
import { ref } from 'vue';

import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'

// state of sidebar
const sidebarOpen = ref(true);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>

    <div class="min-h-screen bg-background">

        <Sidebar :open="sidebarOpen" />

        <div class="transition-all duration-300" :class="sidebarOpen ? 'ml-64' : 'ml-20'">

            <Navbar @toggle-sidebar="toggleSidebar" />


            <main class="p-6">

                <RouterView />

            </main>

        </div>

    </div>
</template>