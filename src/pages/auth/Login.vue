<script setup>

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"


import {
    Input
} from "@/components/ui/input"


import {
    Button
} from "@/components/ui/button"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()
const router = useRouter()

const username = ref("")
const password = ref("")


const login = () => {
    auth.login(username.value)
    router.push({ name: "dashboard" })
}


</script>



<template>

    <Card>

        <CardHeader>
            <CardTitle class="text-2xl text-center">
                Welcome
            </CardTitle>

            <CardDescription class="text-center">
                Login to manage your tickets
            </CardDescription>
        </CardHeader>


        <CardContent>

            <form class="space-y-4" @submit.prevent="login">

                <div>
                    <label class="text-sm">
                        Username
                    </label>

                    <Input type="text" placeholder="Enter your username" autocomplete="username" v-model="username" />
                </div>


                <div>

                    <div class="flex items-center justify-between">

                        <label class="text-sm">
                            Password
                        </label>

                        <!-- <RouterLink to="/forgot-password"> -->
                            Forgot password?
                        <!-- </RouterLink> -->

                    </div>


                    <Input type="password" placeholder="Enter your password" autocomplete="current-password"
                        v-model="password" />

                </div>


                <Button class="w-full" type="submit">
                    Login
                </Button>


            </form>


            <div class="mt-6 text-center text-sm text-muted-foreground">

                Don't have an account?

                <RouterLink to="/register" class="text-primary font-medium hover:underline">
                    Create account
                </RouterLink>
            </div>


        </CardContent>


    </Card>


</template>