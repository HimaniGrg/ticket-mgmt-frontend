<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'
import { useAuthStore } from '@/stores/auth'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, UserCheck, ShieldAlert, Clock, CheckCircle2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const ticketStore = useTicketStore()
const authStore = useAuthStore()

const ticketId = route.params.id
const newComment = ref("")
const selectedStatus = ref("")
const selectedAssignee = ref("")
const actionLoading = ref(false)

onMounted(async () => {
    try {
        await ticketStore.fetchTicket(ticketId)
        await ticketStore.fetchComments(ticketId)
        
        if (authStore.user?.role === 'Admin') {
            await ticketStore.fetchStaffUsers()
        }

        if (ticketStore.ticket) {
            selectedStatus.value = ticketStore.ticket.status
            selectedAssignee.value = ticketStore.ticket.assigned_to || ""
        }
    } catch (err) {
        console.error("Failed to load ticket details:", err)
    }
})

const handleStatusChange = async () => {
    actionLoading.value = true
    try {
        await ticketStore.updateStatus(ticketId, selectedStatus.value)
    } finally {
        actionLoading.value = false
    }
}

const handleAssignment = async () => {
    if (!selectedAssignee.value) return
    actionLoading.value = true
    try {
        await ticketStore.assignTicket(ticketId, selectedAssignee.value)
    } finally {
        actionLoading.value = false
    }
}

const postComment = async () => {
    if (!newComment.value.trim()) return
    actionLoading.value = true
    try {
        await ticketStore.addComment(ticketId, newComment.value)
        newComment.value = ""
    } finally {
        actionLoading.value = false
    }
}
</script>

<template>
    <div v-if="ticketStore.loading && !ticketStore.ticket" class="text-center py-20 text-muted-foreground">
        Loading ticket details...
    </div>

    <div v-else-if="!ticketStore.ticket" class="text-center py-20 space-y-4">
        <p class="text-destructive font-medium">Ticket not found or failed to load.</p>
        <RouterLink to="/app/ticket-list">
            <Button variant="outline">Return to Ticket List</Button>
        </RouterLink>
    </div>

    <div class="space-y-6 max-w-4xl mx-auto" v-else>
        <div class="flex items-center justify-between">
            <RouterLink to="/app/ticket-list" class="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft class="mr-2 h-4 w-4" /> Back to Tickets
            </RouterLink>

            <div class="flex items-center gap-2">
                <span class="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
                    {{ ticketStore.ticket.status }}
                </span>
                <span class="rounded-full bg-orange-100 text-orange-800 px-3 py-1 text-xs font-medium">
                    {{ ticketStore.ticket.priority }} Priority
                </span>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle class="text-2xl">#{{ ticketStore.ticket.id }} - {{ ticketStore.ticket.subject }}</CardTitle>
                <CardDescription>
                    Created by {{ ticketStore.ticket.user?.name || 'User' }} on {{ ticketStore.ticket.created_at }}
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <div class="bg-muted/40 p-4 rounded-lg text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {{ ticketStore.ticket.description }}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" v-if="['Admin', 'Staff'].includes(authStore.user?.role)">
                    <div class="space-y-2">
                        <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Change Status</label>
                        <div class="flex gap-2">
                            <select v-model="selectedStatus" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <Button size="sm" @click="handleStatusChange" :disabled="actionLoading">Update</Button>
                        </div>
                    </div>

                    <div class="space-y-2" v-if="authStore.user?.role === 'Admin'">
                        <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assign Staff Member</label>
                        <div class="flex gap-2">
                            <select v-model="selectedAssignee" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                                <option disabled value="">Select staff member</option>
                                <option v-for="staff in ticketStore.users" :key="staff.id" :value="staff.id">
                                    {{ staff.name }}
                                </option>
                            </select>
                            <Button size="sm" variant="outline" @click="handleAssignment" :disabled="actionLoading">Assign</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle class="text-lg">Discussion & Updates</CardTitle>
                <CardDescription>Communication history between users, staff, and admins</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <div class="space-y-4">
                    <div v-for="comment in ticketStore.comments" :key="comment.id" class="border-b pb-4 space-y-1">
                        <div class="flex items-center justify-between text-xs text-muted-foreground">
                            <span class="font-medium text-foreground text-sm">{{ comment.user?.name || 'Support Member' }}</span>
                            <span>{{ comment.created_at }}</span>
                        </div>
                        <p class="text-sm text-muted-foreground pt-1">{{ comment.body }}</p>
                    </div>

                    <div v-if="ticketStore.comments.length === 0" class="text-center py-6 text-sm text-muted-foreground">
                        No comments posted yet. Start the thread below.
                    </div>
                </div>

                <div class="space-y-3 pt-4 border-t">
                    <textarea 
                        v-model="newComment" 
                        rows="3" 
                        placeholder="Type your reply or status comment here..." 
                        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    ></textarea>
                    
                    <div class="flex justify-end">
                        <Button @click="postComment" :disabled="actionLoading || !newComment.trim()">
                            <Send class="mr-2 h-4 w-4" /> Send
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>