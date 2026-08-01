<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter } from 'vue-router'
import { useTicketStore } from "@/stores/ticket"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, ChevronRight, ChevronLeft, Filter, AlertCircle } from "lucide-vue-next"

const router = useRouter()
const ticketStore = useTicketStore()

const search = ref("")
const selectedStatus = ref("")
const selectedPriority = ref("")
const currentPage = ref(1)

const loadTickets = async () => {
    const filters = {
        page: currentPage.value
    }
    if (selectedStatus.value) filters.status = selectedStatus.value
    if (selectedPriority.value) filters.priority = selectedPriority.value

    await ticketStore.fetchTickets(filters)
}

onMounted(() => {
    loadTickets()
})

watch([selectedStatus, selectedPriority], () => {
    currentPage.value = 1
    loadTickets()
})

watch(currentPage, () => {
    loadTickets()
})

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

const getStatusColor = (status) => {
    switch (status) {
        case 'Open': return 'bg-amber-100 text-amber-800 border-amber-200'
        case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'Resolved': return 'bg-green-100 text-green-800 border-green-200'
        case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200'
        default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Low': return 'bg-slate-100 text-slate-700'
        case 'Medium': return 'bg-sky-100 text-sky-700'
        case 'High': return 'bg-orange-100 text-orange-700'
        case 'Urgent': return 'bg-rose-100 text-rose-700'
        default: return 'bg-slate-100 text-slate-700'
    }
}
</script>

<template>
    <div class="space-y-4 w-full pb-10">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Tickets</h1>
                <p class="text-muted-foreground mt-1">Manage and track customer support requests.</p>
            </div>
            <Button @click="router.push({ name: 'ticket-create' })" class="w-full sm:w-auto shadow-sm">
                <Plus class="mr-2 h-4 w-4" /> New Ticket
            </Button>
        </div>

        <Card class="border-border/40 shadow-sm overflow-hidden">
            <CardHeader class="bg-muted/20 pb-4 border-b">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div class="relative w-full md:w-96">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Search tickets by subject or ID..."
                            class="pl-9 w-full bg-background/50" />
                    </div>

                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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

            <div class="p-0">
                <div class="w-full overflow-x-auto">
                    <table class="w-full text-left text-sm whitespace-nowrap">
                        <thead class="bg-muted/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                            <tr>
                                <th class="py-4 px-6 border-b">Ticket</th>
                                <th class="py-4 px-6 border-b">Status</th>
                                <th class="py-4 px-6 border-b hidden md:table-cell">Priority</th>
                                <th class="py-4 px-6 border-b hidden lg:table-cell">Assignee</th>
                                <th class="py-4 px-6 border-b hidden lg:table-cell">Created</th>
                                <th class="py-4 px-6 border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/50 bg-card">
                            <tr v-if="ticketStore.loading">
                                <td colspan="6" class="text-center py-12">
                                    <div class="flex flex-col items-center justify-center text-muted-foreground">
                                        <div class="h-6 w-6 animate-spin rounded-full border-b-2 border-primary mb-4">
                                        </div>
                                        Loading tickets...
                                    </div>
                                </td>
                            </tr>
                            <tr v-else-if="filteredTickets.length === 0">
                                <td colspan="6" class="text-center py-16">
                                    <div class="flex flex-col items-center justify-center text-muted-foreground">
                                        <AlertCircle class="h-10 w-10 mb-4 opacity-50" />
                                        <p class="text-lg font-medium text-foreground">No tickets found</p>
                                        <p class="text-sm mt-1">Try adjusting your search or filters.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="ticket in filteredTickets" :key="ticket.id"
                                class="hover:bg-muted/40 transition-colors group cursor-pointer"
                                @click="viewTicket(ticket.id)">
                                <td class="py-4 px-6">
                                    <div class="flex flex-col">
                                        <span
                                            class="font-semibold text-foreground group-hover:text-primary transition-colors truncate max-w-xs xl:max-w-md">
                                            {{ ticket.subject }}
                                        </span>
                                        <span class="text-xs text-muted-foreground mt-0.5">#{{ ticket.id }}</span>
                                    </div>
                                </td>
                                <td class="py-4 px-6">
                                    <span
                                        :class="['px-2.5 py-1 text-xs font-semibold rounded-full border', getStatusColor(ticket.status)]">
                                        {{ ticket.status }}
                                    </span>
                                </td>
                                <td class="py-4 px-6 hidden md:table-cell">
                                    <span
                                        :class="['px-2.5 py-1 text-xs font-semibold rounded-full', getPriorityColor(ticket.priority)]">
                                        {{ ticket.priority }}
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-muted-foreground hidden lg:table-cell">
                                    <div class="flex items-center gap-2">
                                        <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold"
                                            v-if="ticket.assignee">
                                            {{ (ticket.assignee?.name || ticket.assignee).charAt(0) }}
                                        </div>
                                        <div class="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold"
                                            v-else>
                                            ?
                                        </div>
                                        {{ ticket.assignee?.name || ticket.assignee || 'Unassigned' }}
                                    </div>
                                </td>
                                <td class="py-4 px-6 text-muted-foreground hidden lg:table-cell text-sm">
                                    {{ new Date(ticket.created_at).toLocaleDateString(undefined, {
                                        month: 'short', day:
                                    'numeric', year: 'numeric' }) }}
                                </td>
                                <td class="py-4 px-6 text-right">
                                    <Button variant="ghost" size="icon" @click.stop="viewTicket(ticket.id)">
                                        <Eye class="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-muted/20 border-t"
                    v-if="ticketStore.meta?.last_page > 1">
                    <p class="text-sm text-muted-foreground mb-4 sm:mb-0">
                        Showing <span class="font-medium text-foreground">{{ ticketStore.meta.current_page }}</span> of
                        <span class="font-medium text-foreground">{{ ticketStore.meta.last_page }}</span> pages ({{
                            ticketStore.meta.total }} total)
                    </p>
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" :disabled="ticketStore.meta.current_page <= 1"
                            @click="currentPage--" class="flex-1 sm:flex-none">
                            <ChevronLeft class="h-4 w-4 mr-1" /> Prev
                        </Button>
                        <Button variant="outline" size="sm"
                            :disabled="ticketStore.meta.current_page >= ticketStore.meta.last_page"
                            @click="currentPage++" class="flex-1 sm:flex-none">
                            Next
                            <ChevronRight class="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>