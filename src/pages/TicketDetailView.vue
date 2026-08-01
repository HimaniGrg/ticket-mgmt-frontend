<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'
import { useAuthStore } from '@/stores/auth'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Edit3, Save, X, History, MessageCircle, ShieldCheck, UserCheck } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const ticketStore = useTicketStore()
const authStore = useAuthStore()

const ticketId = route.params.id
const newComment = ref("")
const selectedStatus = ref("")
const selectedAssignee = ref("")
const actionLoading = ref(false)

// Description Editing States
const isEditingDescription = ref(false)
const editableDescription = ref("")

onMounted(async () => {
    try {
        await ticketStore.fetchTicket(ticketId)
        await ticketStore.fetchComments(ticketId)

        if (authStore.user?.role === 'Admin') {
            await ticketStore.fetchStaffUsers()
        }

        if (ticketStore.ticket) {
            selectedStatus.value = ticketStore.ticket.status
            selectedAssignee.value =
                ticketStore.ticket.assigned_to ??
                ticketStore.ticket.assigned_to_id ??
                ticketStore.ticket.assignee?.id ??
                ""
            editableDescription.value = ticketStore.ticket.description || ""
        }
    } catch (err) {
        console.error("Failed to load ticket details:", err)
    }
})

watch(() => ticketStore.ticket, (newTicket) => {
    if (newTicket) {
        selectedStatus.value = newTicket.status
        selectedAssignee.value =
            newTicket.assigned_to ??
            newTicket.assigned_to_id ??
            newTicket.assignee?.id ??
            ""
        if (!isEditingDescription.value) {
            editableDescription.value = newTicket.description || ""
        }
    }
}, { deep: true })

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

const saveDescription = async () => {
    if (!editableDescription.value.trim()) return
    actionLoading.value = true
    try {
        if (typeof ticketStore.updateDescription === 'function') {
            await ticketStore.updateDescription(ticketId, editableDescription.value)
        } else {
            await ticketStore.fetchTicket(ticketId)
        }
        ticketStore.ticket.description = editableDescription.value
        isEditingDescription.value = false
    } catch (err) {
        console.error("Failed to update description:", err)
    } finally {
        actionLoading.value = false
    }
}

const cancelEditDescription = () => {
    editableDescription.value = ticketStore.ticket.description || ""
    isEditingDescription.value = false
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

// Adaptive color helpers that look crisp on both light and dark backgrounds
const getStatusColor = (status) => {
    switch(status) {
        case 'Open': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        case 'In Progress': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        case 'Resolved': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        case 'Closed': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
        default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
    }
}

const getPriorityColor = (priority) => {
    switch(priority) {
        case 'Low': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        case 'Medium': return 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
        case 'High': return 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300'
        case 'Urgent': return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
        default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    }
}
</script>

<template>
    <div class="space-y-6 w-full pb-10">
        
        <div v-if="ticketStore.loading && !ticketStore.ticket" class="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary mb-4"></div>
            Loading ticket information...
        </div>

        <div v-else-if="!ticketStore.ticket" class="flex flex-col items-center justify-center py-32 space-y-4">
            <AlertCircle class="h-12 w-12 text-destructive opacity-80" />
            <p class="text-xl font-semibold text-foreground">Ticket Not Found</p>
            <p class="text-muted-foreground">The ticket you are looking for does not exist or you lack permission.</p>
            <RouterLink to="/app/ticket-list" class="mt-4">
                <Button variant="outline">Return to Tickets</Button>
            </RouterLink>
        </div>

        <div class="space-y-6 animate-in fade-in duration-300" v-else>
            <!-- Top Header & Meta -->
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/60 pb-5">
                <div class="space-y-1.5">
                    <RouterLink to="/app/ticket-list"
                        class="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft class="mr-1.5 h-4 w-4" /> Back to Tickets
                    </RouterLink>
                    <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-foreground break-words pt-1">
                        {{ ticketStore.ticket.subject }}
                    </h1>
                    <p class="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                        <span class="font-medium text-foreground/80">Ticket #{{ ticketStore.ticket.id }}</span>
                        <span>&bull;</span>
                        <span>Opened {{ new Date(ticketStore.ticket.created_at).toLocaleString() }}</span>
                    </p>
                </div>
                <div class="flex items-center gap-2.5">
                    <span :class="['px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full border shadow-2xs', getStatusColor(ticketStore.ticket.status)]">
                        {{ ticketStore.ticket.status }}
                    </span>
                    <span :class="['px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full border border-transparent', getPriorityColor(ticketStore.ticket.priority)]">
                        {{ ticketStore.ticket.priority }}
                    </span>
                </div>
            </div>

            <!-- Main Workspace Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Left Column: Description & Discussion Thread -->
                <div class="lg:col-span-2 space-y-6">
                    
                    <!-- Ticket Description Card -->
                    <Card class="border-border/60 shadow-xs bg-card">
                        <CardHeader class="border-b border-border/40 bg-muted/30 flex flex-row items-center justify-between py-3 px-5">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                    {{ (ticketStore.ticket.user?.name || 'U').charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <p class="font-semibold text-sm text-foreground">{{ ticketStore.ticket.user?.name || 'Unknown User' }}</p>
                                    <p class="text-[11px] text-muted-foreground">Original Reporter</p>
                                </div>
                            </div>
                            <Button 
                                v-if="!isEditingDescription && (authStore.user?.role === 'Admin' || authStore.user?.role === 'Staff' || ticketStore.ticket.user_id === authStore.user?.id)" 
                                variant="ghost" 
                                size="sm" 
                                @click="isEditingDescription = true"
                                class="text-muted-foreground hover:text-primary h-8 px-2.5 text-xs"
                            >
                                <Edit3 class="w-3.5 h-3.5 mr-1.5" /> Edit Description
                            </Button>
                        </CardHeader>
                        <CardContent class="p-5">
                            <div v-if="!isEditingDescription" class="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line text-foreground/90 leading-relaxed text-sm">
                                {{ ticketStore.ticket.description }}
                            </div>

                            <div v-else class="space-y-3 pt-1">
                                <textarea 
                                    v-model="editableDescription" 
                                    rows="5" 
                                    class="flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-y"
                                    placeholder="Update ticket description..."
                                ></textarea>
                                <div class="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" @click="cancelEditDescription" :disabled="actionLoading" class="h-8 text-xs">
                                        <X class="w-3.5 h-3.5 mr-1" /> Cancel
                                    </Button>
                                    <Button size="sm" @click="saveDescription" :disabled="actionLoading || !editableDescription.trim()" class="h-8 text-xs">
                                        <Save class="w-3.5 h-3.5 mr-1" /> Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Discussion Section -->
                    <Card class="border-border/60 shadow-xs bg-card">
                        <CardHeader class="pb-3 border-b border-border/40 bg-muted/30 px-5 py-3">
                            <CardTitle class="text-sm font-semibold flex items-center text-foreground">
                                <MessageCircle class="w-4 h-4 mr-2 text-primary" /> Discussion Thread
                            </CardTitle>
                        </CardHeader>
                        <CardContent class="p-0">
                            <div class="divide-y divide-border/45 max-h-[500px] overflow-y-auto p-5 space-y-5">
                                <div v-if="ticketStore.comments.length === 0" class="text-center py-10 text-muted-foreground text-sm">
                                    No comments yet. Start the conversation below.
                                </div>
                                
                                <div v-for="comment in ticketStore.comments" :key="comment.id" class="flex gap-3.5 pt-4 first:pt-0">
                                    <div class="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                                        {{ (comment.author?.name || comment.user?.name || 'S').charAt(0).toUpperCase() }}
                                    </div>
                                    <div class="flex-1 space-y-1.5">
                                        <div class="flex items-center justify-between">
                                            <span class="font-semibold text-xs text-foreground">{{ comment.author?.name || comment.user?.name || 'Support Agent' }}</span>
                                            <span class="text-[11px] text-muted-foreground" :title="comment.created_at">
                                                {{ new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} &bull; {{ new Date(comment.created_at).toLocaleDateString() }}
                                            </span>
                                        </div>
                                        <div class="bg-muted/50 p-3 rounded-lg text-xs md:text-sm text-foreground/90 leading-relaxed whitespace-pre-line border border-border/40 shadow-2xs">
                                            {{ comment.body }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-4 border-t border-border/40 bg-muted/20">
                                <div class="space-y-3">
                                    <textarea v-model="newComment" rows="3" placeholder="Type your reply here..."
                                        class="flex w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-y min-h-[80px]"></textarea>
                                    <div class="flex justify-end">
                                        <Button @click="postComment" :disabled="actionLoading || !newComment.trim()" size="sm" class="h-9 px-4">
                                            <Send class="mr-1.5 h-3.5 w-3.5" /> Post Reply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <!-- Right Column: Enhanced Ticket Actions & Activity Timeline -->
                <div class="space-y-6">
                    
                    <!-- Redesigned Ticket Actions Box -->
                    <Card class="border-border/60 shadow-xs bg-card overflow-hidden" v-if="['Admin', 'Staff'].includes(authStore.user?.role)">
                        <CardHeader class="pb-3 border-b border-border/40 bg-muted/30 px-5 py-3">
                            <CardTitle class="text-sm font-semibold flex items-center text-foreground">
                                <ShieldCheck class="w-4 h-4 mr-2 text-primary" /> Ticket Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent class="p-5 space-y-5">
                            
                            <!-- Status Update Control -->
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Change Status
                                </label>
                                <div class="space-y-2">
                                    <select v-model="selectedStatus"
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs md:text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none cursor-pointer">
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        class="w-full h-8 text-xs font-medium border-border/80 hover:bg-muted/60" 
                                        @click="handleStatusChange" 
                                        :disabled="actionLoading || selectedStatus === ticketStore.ticket.status"
                                    >
                                        Update Status
                                    </Button>
                                </div>
                            </div>

                            <!-- Assignment Control (Admin Only) -->
                            <div class="space-y-2 pt-4 border-t border-border/40" v-if="authStore.user?.role === 'Admin'">
                                <label class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <UserCheck class="w-3.5 h-3.5 text-primary" /> Assign Staff Member
                                </label>
                                <div class="space-y-2">
                                    <select v-model="selectedAssignee"
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs md:text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none cursor-pointer">
                                        <option disabled value="">Select staff member...</option>
                                        <option v-for="staff in ticketStore.users" :key="staff.id" :value="staff.id">
                                            {{ staff.name }}
                                        </option>
                                    </select>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        class="w-full h-8 text-xs font-medium border-border/80 hover:bg-muted/60" 
                                        @click="handleAssignment"
                                        :disabled="actionLoading || !selectedAssignee"
                                    >
                                        Assign Ticket
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Activity Sidebar Box -->
                    <Card class="border-border/60 shadow-xs bg-card">
                        <CardHeader class="pb-3 border-b border-border/40 bg-muted/30 px-5 py-3">
                            <CardTitle class="text-sm font-semibold flex items-center text-foreground">
                                <History class="w-4 h-4 mr-2 text-primary" /> Activity Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent class="p-5">
                            <div class="relative pl-5 space-y-4 before:content-[''] before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-px before:bg-border/80">
                                <div class="relative text-xs">
                                    <span class="absolute -left-[23px] top-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-card"></span>
                                    <p class="font-medium text-foreground">Ticket Created</p>
                                    <p class="text-muted-foreground text-[11px] mt-0.5">{{ new Date(ticketStore.ticket.created_at).toLocaleString() }}</p>
                                </div>
                                <div v-if="ticketStore.ticket.assignee" class="relative text-xs">
                                    <span class="absolute -left-[23px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-card"></span>
                                    <p class="font-medium text-foreground">Staff Assigned</p>
                                    <p class="text-muted-foreground text-[11px] mt-0.5">Assigned to {{ ticketStore.ticket.assignee?.name || 'Staff' }}</p>
                                </div>
                                <div class="relative text-xs">
                                    <span class="absolute -left-[23px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-card"></span>
                                    <p class="font-medium text-foreground">Current Status: {{ ticketStore.ticket.status }}</p>
                                    <p class="text-muted-foreground text-[11px] mt-0.5">Active stage in lifecycle</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>