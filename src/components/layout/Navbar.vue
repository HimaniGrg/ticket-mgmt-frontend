<script setup>

import { Menu, Bell } from 'lucide-vue-next'

import ThemeToggle from '@/components/common/ThemeToggle.vue'


const emit = defineEmits([
    'toggle-sidebar'
])

</script>


<template>


<header
    class="h-16 border-b bg-background flex items-center justify-between px-6"
>


    <!-- Left -->

    <div class="flex items-center gap-4">


        <button
            @click="$emit('toggle-sidebar')"
            class="p-2 rounded hover:bg-accent"
        >

            <Menu />

        </button>


        <h1 class="text-xl font-semibold">
            Dashboard
        </h1>


    </div>



    <!-- Right -->

    <div class="flex items-center gap-4">


        <button
            class="relative p-2 rounded hover:bg-accent"
        >

            <Bell />

            <span
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
            ></span>

        </button>



        <ThemeToggle />



        <div class="flex items-center gap-2">


            <div
                class="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center"
            >
                H
            </div>


            <span class="text-sm">
                Himani
            </span>


        </div>


    </div>


</header>


</template>