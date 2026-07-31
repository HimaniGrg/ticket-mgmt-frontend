<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, Clock3, CircleCheckBig, FolderOpen, Plus } from "lucide-vue-next"
import { useAuthStore } from "@/stores/auth"
import { useTicketStore } from "@/stores/ticket"

const auth = useAuthStore()
const ticketStore = useTicketStore()
const router = useRouter()

onMounted(async () => {
    await ticketStore.fetchTickets()
})

const stats = computed(() => [
    { title: "Open Tickets", value: ticketStore.openCount, icon: Ticket },
    { title: "In Progress", value: ticketStore.inProgressCount, icon: Clock3 },
    { title: "Resolved", value: ticketStore.resolvedCount, icon: CircleCheckBig },
    { title: "Closed", value: ticketStore.closedCount, icon: FolderOpen }
])

const recentTickets = computed(() => {
    return ticketStore.tickets.slice(0, 5) // Show top 5 recent
})

const activities = [
    "System synchronization completed successfully",
    "New ticket notification hooks active",
]
</script>

<template>
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold">Welcome back, {{ auth.user?.name }} 👋</h1>
            <p class="text-muted-foreground">Here's what's happening today.</p>
        </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card v-for="item in stats" :key="item.title">
            <CardContent class="flex items-center justify-between p-6">
                <div>
                    <p class="text-sm text-muted-foreground">{{ item.title }}</p>
                    <h2 class="text-3xl font-bold mt-2">{{ item.value }}</h2>
                </div>
                <component :is="item.icon" class="h-9 w-9 text-primary" />
            </CardContent>
        </Card>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest support requests</CardDescription>
            </CardHeader>
            <CardContent>
                <div v-if="ticketStore.loading" class="text-sm text-muted-foreground py-4">Loading stats...</div>
                <div v-else-if="recentTickets.length === 0" class="text-sm text-muted-foreground py-4">No recent tickets available.</div>
                <div v-for="ticket in recentTickets" :key="ticket.id" class="flex items-center justify-between border-b py-4 last:border-none">
                    <div>
                        <p class="font-medium">#{{ ticket.id }}</p>
                        <p class="text-sm text-muted-foreground">{{ ticket.subject }}</p>
                    </div>
                    <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {{ ticket.status }}
                    </span>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Latest logs and updates</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div v-for="activity in activities" :key="activity" class="border-b py-3 text-sm text-muted-foreground last:border-none">
                    {{ activity }}
                </div>
            </CardContent>
        </Card>
    </div>
</div>
</template>