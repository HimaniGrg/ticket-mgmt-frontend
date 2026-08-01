<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, UserCheck, AlertCircle } from 'lucide-vue-next'

const userStore = useUserStore()
const authStore = useAuthStore()

const updatingId = ref(null)
const successMessage = ref("")

onMounted(async () => {
    if (authStore.user?.role === 'Admin') {
        await userStore.fetchUsers()
        await userStore.fetchRoles()
    }
})

const handleRoleChange = async (userId, newRole) => {
    updatingId.value = userId
    successMessage.value = ""
    try {
        await userStore.updateUserRole(userId, newRole)
        successMessage.value = `User role successfully updated to ${newRole}.`
        setTimeout(() => successMessage.value = "", 4000)
    } catch (error) {
        console.error("Failed to update user role:", error)
    } finally {
        updatingId.value = null
    }
}
</script>

<template>
    <div v-if="authStore.user?.role !== 'Admin'" class="text-center py-20 space-y-3">
        <ShieldAlert class="mx-auto h-12 w-12 text-destructive" />
        <h2 class="text-xl font-bold">Access Denied</h2>
        <p class="text-sm text-muted-foreground">You must have Administrator privileges to manage user roles.</p>
    </div>

    <div class="space-y-6 max-w-5xl" v-else>
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">User & Role Management</h1>
                <p class="text-muted-foreground">Assign and modify system access roles for registered accounts.</p>
            </div>
        </div>

        <div v-if="successMessage" class="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-600 flex items-center gap-2">
            <UserCheck class="h-4 w-4" />
            <span>{{ successMessage }}</span>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Registered System Users</CardTitle>
                <CardDescription>Select a role from the dropdown to instantly update permissions</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="border-b">
                            <tr class="text-left text-sm text-muted-foreground">
                                <th class="py-3">Name</th>
                                <th>Email</th>
                                <th>Current Role</th>
                                <th class="text-right">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="userStore.loading">
                                <td colspan="4" class="text-center py-6 text-muted-foreground">Loading users...</td>
                            </tr>
                            <tr v-else-if="userStore.users.length === 0">
                                <td colspan="4" class="text-center py-6 text-muted-foreground">No users found.</td>
                            </tr>
                            <tr v-for="user in userStore.users" :key="user.id" class="border-b hover:bg-muted/40">
                                <td class="py-4 font-medium">{{ user.name }}</td>
                                <td class="text-muted-foreground">{{ user.email }}</td>
                                <td>
                                    <span class="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                                        {{ user.role }}
                                    </span>
                                </td>
                                <td class="text-right">
                                    <div class="flex justify-end items-center gap-2">
                                        <select 
                                            :value="user.role" 
                                            @change="(e) => handleRoleChange(user.id, e.target.value)"
                                            :disabled="updatingId === user.id"
                                            class="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        >
                                            <option v-for="role in userStore.roles" :key="role" :value="role">
                                                {{ role }}
                                            </option>
                                        </select>
                                        <span v-if="updatingId === user.id" class="text-xs text-muted-foreground animate-pulse">Saving...</span>
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