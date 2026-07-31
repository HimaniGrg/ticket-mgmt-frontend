<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const ticketStore = useTicketStore()

const subject = ref("")
const description = ref("")
const priority = ref("Medium") // Default selection
const errorMessage = ref("")

const submitTicket = async () => {
    errorMessage.value = ""

    try {
        const createdTicket = await ticketStore.createTicket({
            subject: subject.value,
            description: description.value,
            priority: priority.value
        })

        // Redirect to ticket details or back to the list upon success
        router.push({ name: 'ticket-detail', params: { id: createdTicket.id } })
    } catch (error) {
        console.log(error)
        errorMessage.value = error.response?.data?.message || "Failed to create ticket. Please check your inputs."
    }
}
</script>

<template>
    <div class="space-y-6 max-w-3xl mx-auto">
        <div class="flex items-center justify-between">
            <RouterLink to="/app/ticket-list" class="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft class="mr-2 h-4 w-4" /> Back to Tickets
            </RouterLink>
        </div>

        <Card>
            <CardHeader>
                <CardTitle class="text-2xl">Create New Support Ticket</CardTitle>
                <CardDescription>Submit a new issue or request. Our support staff and admins will be notified instantly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form class="space-y-6" @submit.prevent="submitTicket">
                    <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
                        <AlertCircle class="h-4 w-4" />
                        <span>{{ errorMessage }}</span>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">Subject / Title <span class="text-red-500">*</span></label>
                        <Input 
                            type="text" 
                            v-model="subject" 
                            placeholder="e.g. System crash on login page" 
                            required 
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">Priority Level <span class="text-red-500">*</span></label>
                        <select 
                            v-model="priority" 
                            class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            required
                        >
                            <option value="Low">Low - General inquiry or minor issue</option>
                            <option value="Medium">Medium - Standard workflow obstruction</option>
                            <option value="High">High - Critical system block or failure</option>
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">Description <span class="text-red-500">*</span></label>
                        <textarea 
                            v-model="description" 
                            rows="5" 
                            placeholder="Provide detailed information regarding the problem or error message..." 
                            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            required
                        ></textarea>
                    </div>

                    <div class="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" @click="router.push({ name: 'ticket-list' })">
                            Cancel
                        </Button>
                        <Button type="submit" :disabled="ticketStore.loading">
                            <span v-if="ticketStore.loading">Submitting...</span>
                            <span v-else class="inline-flex items-center">
                                <Send class="mr-2 h-4 w-4" /> Submit Ticket
                            </span>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>