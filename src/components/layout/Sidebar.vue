<script setup>
import { LayoutDashboard, Ticket, Users, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

defineProps({
    open: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'toggle-sidebar'
])

const auth = useAuthStore()

const menuItems = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        route: { name: 'dashboard' }
    },
    {
        name: 'Tickets',
        icon: Ticket,
        route: { name: 'ticket-list' }
    },
    {
        name: 'Users',
        icon: Users,
        route: { name: 'user-management' }
    },
]
</script>

<template>

    <aside class="fixed left-0 top-0 h-screen bg-card border-r transition-all duration-300"
        :class="open ? 'w-64' : 'w-20'">

        <!-- Border Toggle Button -->
        <button 
            @click="$emit('toggle-sidebar')" 
            class="absolute -right-3.5 top-4 z-40 flex h-7 w-7 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent text-foreground cursor-pointer transition-transform"
        >
            <ChevronLeft v-if="open" class="h-4 w-4" />
            <ChevronRight v-else class="h-4 w-4" />
        </button>

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
            <RouterLink v-for="item in menuItems" :key="item.name" :to="item.route"
                class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                active-class="bg-primary text-primary-foreground">

                <component :is="item.icon" class="h-5 w-5 shrink-0" />

                <span v-if="open" class="truncate">
                    {{ item.name }}
                </span>
            </RouterLink>
        </nav>

        <!-- User Section -->
        <div class="absolute bottom-0 w-full border-t p-4 bg-card">
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="h-10 w-10 shrink-0 rounded-full bg-primary text-white flex items-center justify-center">
                    {{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U' }}
                </div>

                <div v-if="open" class="truncate">
                    <p class="text-sm font-medium truncate">
                        {{ auth.user?.name }}
                    </p>
                    <p class="text-xs text-muted-foreground truncate">
                        {{ auth.user?.role }}
                    </p>
                </div>
            </div>
        </div>

    </aside>
</template>