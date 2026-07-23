<script setup>

import { Moon, Sun } from "lucide-vue-next";


const toggleTheme = () => {

    document.documentElement.classList.toggle(
        "dark"
    )

}

</script>


<template>

<button @click="toggleTheme">

    <Sun
       class="hidden dark:block"
    />

    <Moon
       class="block dark:hidden"
    />

</button>

</template>