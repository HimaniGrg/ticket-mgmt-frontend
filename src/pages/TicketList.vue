<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter } from 'vue-router'
import { useTicketStore } from "@/stores/ticket"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, Pencil } from "lucide-vue-next"

const router = useRouter()
const ticketStore = useTicketStore()

const search = ref("")
const selectedStatus = ref("")
const selectedPriority = ref("")

const loadTickets = async () => {
    const filters = {}
    if (selectedStatus.value) filters.status = selectedStatus.value
    if (selectedPriority.value) filters.priority = selectedPriority.value

    await ticketStore.fetchTickets(filters)
}

onMounted(() => {
    loadTickets()
})

// Watch dropdown changes to query backend automatically
watch([selectedStatus, selectedPriority], () => {
    loadTickets()
})

// Client-side filtering for search input on top of server data
const filteredTickets = computed(() => {
    if (!search.value) return ticketStore.tickets
    return ticketStore.tickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(search.value.toLowerCase()) ||
        String(ticket.id).includes(search.value)
    )
})

const viewTicket = (id) => {
    router.push({ name: 'ticket-detail', params: { id } })
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold">Tickets</h1>
                <p class="text-muted-foreground">View and manage support tickets.</p>
            </div>
            <Button @click="router.push({ name: 'ticket-create' })">
                <Plus class="mr-2 h-4 w-4" /> New Ticket
            </Button>
        </div>

        <Card>
            <CardHeader>
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div class="relative w-full md:w-80">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Search tickets..." class="pl-9" />
                    </div>

                    <div class="flex items-center gap-3">
                        <select v-model="selectedStatus"
                            class="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option value="">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>

                        <select v-model="selectedPriority"
                            class="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="border-b">
                            <tr class="text-left text-sm text-muted-foreground">
                                <th class="py-3">ID</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assignee</th>
                                <th>Created</th>
                                <th class="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="ticketStore.loading">
                                <td colspan="7" class="text-center py-6 text-muted-foreground">Loading tickets...</td>
                            </tr>
                            <tr v-else-if="filteredTickets.length === 0">
                                <td colspan="7" class="text-center py-6 text-muted-foreground">No tickets found.</td>
                            </tr>
                            <tr v-for="ticket in filteredTickets" :key="ticket.id" class="border-b hover:bg-muted/40">
                                <td class="py-4 font-medium">#{{ ticket.id }}</td>
                                <td>{{ ticket.subject }}</td>
                                <td>
                                    <span class="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
                                        {{ ticket.status }}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        class="rounded-full bg-orange-100 text-orange-800 px-3 py-1 text-xs font-medium">
                                        {{ ticket.priority }}
                                    </span>
                                </td>
                                <td>{{ ticket.assignee?.name || ticket.assignee || 'Unassigned' }}</td>
                                <td>{{ ticket.created_at }}</td>
                                <td>
                                    <div class="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" @click="viewTicket(ticket.id)">
                                            <Eye class="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" @click="viewTicket(ticket.id)">
                                            <Pencil class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
</template>