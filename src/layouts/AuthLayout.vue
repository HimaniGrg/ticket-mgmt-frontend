<script setup>
import ThemeToggle from "@/components/common/ThemeToggle.vue"
</script>


<template>

  <div class="
    min-h-screen 
    flex 
    items-center 
    justify-center
    bg-background
">

    <!-- Theme Button -->

    <div class="absolute top-5 right-5">
      <ThemeToggle />
    </div>


    <!-- Content -->

    <main class="w-full max-w-md px-6">

      <RouterView />

    </main>


  </div>

</template>