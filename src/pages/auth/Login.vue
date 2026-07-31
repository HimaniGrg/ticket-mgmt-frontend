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
import { Eye, EyeOff } from "lucide-vue-next"

const auth = useAuthStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const showPassword = ref(false)

const login = async () => {

    errorMessage.value = ""

    try {
        await auth.login({
            email: email.value,
            password: password.value
        })

        router.push({
            name: 'dashboard'
        })


    }
    catch (error) {

        console.log(error)
        errorMessage.value = error.response?.data?.message || "Invalid credentials"

    }

}
</script>



<template>

    <Card>

        <CardHeader>
            <CardTitle class="text-2xl text-center">
                Welcome Back
            </CardTitle>

            <CardDescription class="text-center">
                Login to manage your tickets
            </CardDescription>
        </CardHeader>


        <CardContent>

            <form class="space-y-4" @submit.prevent="login">
                <!-- Error -->
                <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {{ errorMessage }}
                </div>

                <div>
                    <label class="text-sm">
                        Email
                    </label>

                    <Input type="email" placeholder="Enter your email" autocomplete="email" v-model="email"
                        required />
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


                    <div class="relative">

                        <Input v-model="password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password" autocomplete="current-password" required class="pr-10" />


                        <button type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                            @click="showPassword = !showPassword">

                            <Eye v-if="showPassword" class="h-5 w-5" />

                            <EyeOff v-else class="h-5 w-5" />

                        </button>


                    </div>

                </div>


                <Button class="w-full" type="submit" :disabled="auth.loading">

                    <span v-if="auth.loading">
                        Logging in...
                    </span>


                    <span v-else>
                        Login
                    </span>
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