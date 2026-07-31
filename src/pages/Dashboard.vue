<script setup>

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
    Ticket,
    Clock3,
    CircleCheckBig,
    FolderOpen,
    Plus
} from "lucide-vue-next"

import { useAuthStore } from "@/stores/auth"

const auth = useAuthStore()

const stats = [
    {
        title: "Open Tickets",
        value: 12,
        icon: Ticket
    },
    {
        title: "In Progress",
        value: 5,
        icon: Clock3
    },
    {
        title: "Resolved",
        value: 31,
        icon: CircleCheckBig
    },
    {
        title: "Closed",
        value: 87,
        icon: FolderOpen
    }
]

const recentTickets = [
    {
        id: "#1001",
        title: "Cannot login",
        status: "Open"
    },
    {
        id: "#1002",
        title: "Email not working",
        status: "In Progress"
    },
    {
        id: "#1003",
        title: "Password reset",
        status: "Resolved"
    }
]

const activities = [
    "Ticket #1001 assigned to John",
    "Ticket #1002 marked In Progress",
    "Ticket #998 closed successfully",
    "New user registered"
]

</script>

<template>

<div class="space-y-6">

    <!-- Welcome -->

    <div class="flex items-center justify-between">

        <div>

            <h1 class="text-3xl font-bold">
                Welcome back,
                {{ auth.user?.name }} 👋
            </h1>

            <p class="text-muted-foreground">
                Here's what's happening today.
            </p>

        </div>

        <Button>

            <Plus class="mr-2 h-4 w-4"/>

            New Ticket

        </Button>

    </div>

    <!-- Statistics -->

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
            v-for="item in stats"
            :key="item.title"
        >

            <CardContent class="flex items-center justify-between p-6">

                <div>

                    <p class="text-sm text-muted-foreground">
                        {{ item.title }}
                    </p>

                    <h2 class="text-3xl font-bold mt-2">
                        {{ item.value }}
                    </h2>

                </div>

                <component
                    :is="item.icon"
                    class="h-9 w-9 text-primary"
                />

            </CardContent>

        </Card>

    </div>

    <!-- Bottom -->

    <div class="grid gap-6 lg:grid-cols-2">

        <!-- Recent Tickets -->

        <Card>

            <CardHeader>

                <CardTitle>
                    Recent Tickets
                </CardTitle>

                <CardDescription>
                    Latest support requests
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div
                    v-for="ticket in recentTickets"
                    :key="ticket.id"
                    class="flex items-center justify-between border-b py-4 last:border-none"
                >

                    <div>

                        <p class="font-medium">
                            {{ ticket.id }}
                        </p>

                        <p class="text-sm text-muted-foreground">
                            {{ ticket.title }}
                        </p>

                    </div>

                    <span
                        class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                        {{ ticket.status }}
                    </span>

                </div>

            </CardContent>

        </Card>

        <!-- Activity -->

        <Card>

            <CardHeader>

                <CardTitle>
                    Recent Activity
                </CardTitle>

                <CardDescription>
                    Latest updates
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div
                    v-for="activity in activities"
                    :key="activity"
                    class="border-b py-4 last:border-none"
                >

                    {{ activity }}

                </div>

            </CardContent>

        </Card>

    </div>

</div>

</template>