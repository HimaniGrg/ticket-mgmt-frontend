<script setup>

defineProps({
    open: {
        type: Boolean,
        default: false
    }
})

const menuItems = [

    {
        name: 'Dashboard',
        icon: '🏠',
        route: {name: 'dashboard'}
    }

    // {
    //     name: 'Tickets',
    //     icon: '🎫',
    //     route: '/tickets'
    // },

    // {
    //     name: 'Users',
    //     icon: '👥',
    //     route: '/users'
    // },

    // {
    //     name: 'Reports',
    //     icon: '📊',
    //     route: '/reports'
    // },

    // {
    //     name: 'Settings',
    //     icon: '⚙️',
    //     route: '/settings'
    // }

]

</script>


<template>

<aside
    class="fixed left-0 top-0 h-screen bg-card border-r transition-all duration-300"
    :class="open ? 'w-64' : 'w-20'"
>


    <!-- Logo -->

    <div class="h-16 flex items-center px-5 border-b">

        <span class="text-xl font-bold">
            <span v-if="open">
                TicketMS
            </span>

            <span v-else>
                TM
            </span>
        </span>

    </div>



    <!-- Navigation -->

    <nav class="p-4 space-y-2">


        <RouterLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.route"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition"
        >

            <span>
                {{ item.icon }}
            </span>


            <span v-if="open">
                {{ item.name }}
            </span>


        </RouterLink>


    </nav>



    <!-- User Section -->


    <div class="absolute bottom-0 w-full border-t p-4">


        <div class="flex items-center gap-3">


            <div
                class="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center"
            >
                H
            </div>


            <div v-if="open">

                <p class="text-sm font-medium">
                    Himani
                </p>

                <p class="text-xs text-muted-foreground">
                    Admin
                </p>

            </div>


        </div>


    </div>


</aside>


</template>