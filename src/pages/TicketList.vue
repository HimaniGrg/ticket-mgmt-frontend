<script setup>

import { ref } from "vue"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
    Plus,
    Search,
    Eye,
    Pencil
} from "lucide-vue-next"


const search = ref("")

const tickets = ref([
    {
        id: 101,
        subject: "Cannot login",
        status: "Open",
        priority: "High",
        assignee: "John",
        created_at: "Today"
    },
    {
        id: 102,
        subject: "Printer not working",
        status: "In Progress",
        priority: "Medium",
        assignee: "Sarah",
        created_at: "Yesterday"
    },
    {
        id: 103,
        subject: "Password reset",
        status: "Closed",
        priority: "Low",
        assignee: "David",
        created_at: "Jul 28"
    }
])

</script>

<template>

<div class="space-y-6">

    <div class="flex items-center justify-between">

        <div>

            <h1 class="text-3xl font-bold">
                Tickets
            </h1>

            <p class="text-muted-foreground">
                View and manage support tickets.
            </p>

        </div>

        <Button>

            <Plus class="mr-2 h-4 w-4"/>

            Create Ticket

        </Button>

    </div>

    <Card>

        <CardHeader>

            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div class="relative w-full md:w-80">

                    <Search
                        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        v-model="search"
                        placeholder="Search tickets..."
                        class="pl-9"
                    />

                </div>

            </div>

        </CardHeader>

        <CardContent>

            <div class="overflow-x-auto">

                <table class="w-full">

                    <thead class="border-b">

                        <tr class="text-left">

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

                        <tr
                            v-for="ticket in tickets"
                            :key="ticket.id"
                            class="border-b hover:bg-muted/40"
                        >

                            <td class="py-4">
                                #{{ ticket.id }}
                            </td>

                            <td>
                                {{ ticket.subject }}
                            </td>

                            <td>

                                <span
                                    class="rounded-full bg-blue-100 px-3 py-1 text-xs"
                                >
                                    {{ ticket.status }}
                                </span>

                            </td>

                            <td>

                                <span
                                    class="rounded-full bg-orange-100 px-3 py-1 text-xs"
                                >
                                    {{ ticket.priority }}
                                </span>

                            </td>

                            <td>

                                {{ ticket.assignee }}

                            </td>

                            <td>

                                {{ ticket.created_at }}

                            </td>

                            <td>

                                <div class="flex justify-end gap-2">

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >

                                        <Eye class="h-4 w-4"/>

                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >

                                        <Pencil class="h-4 w-4"/>

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