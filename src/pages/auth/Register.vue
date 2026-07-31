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

import {
    Checkbox
} from "@/components/ui/checkbox"

import {
    Eye,
    EyeOff
} from "lucide-vue-next"

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js"



const auth = useAuthStore()
const router = useRouter()



const name = ref("")
const username = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")


const showPassword = ref(false)
const showConfirmPassword = ref(false)


const errorMessage = ref("")

const register = async () => {


    errorMessage.value = ""


    try {


        await auth.register({

            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value

        })


        router.push({
            name: "dashboard"
        })


    }
    catch (error) {


        errorMessage.value =
            error.response?.data?.message ||
            "Registration failed"


    }

}
</script>
<template>

    <div>

        <Card>

            <CardHeader>

                <CardTitle class="text-2xl text-center">
                    Create Account
                </CardTitle>

                <CardDescription class="text-center">
                    Register to start managing your support tickets
                </CardDescription>

            </CardHeader>


            <CardContent>

                <form class="space-y-4" @submit.prevent="register">


                    <!-- Error -->

                    <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">

                        {{ errorMessage }}

                    </div>


                    <div>

                        <label class="text-sm">
                            Full Name
                        </label>

                        <Input type="text" v-model="name" placeholder="Enter your full name" autocomplete="name" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Username
                        </label>

                        <Input type="text" v-model="username" placeholder="Choose a username" autocomplete="username" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Email
                        </label>

                        <Input type="email" v-model="email" placeholder="Enter your email" autocomplete="email" />

                    </div>


                    <div class="space-y-2">


                        <label class="text-sm font-medium">
                            Password
                        </label>


                        <div class="relative">


                            <Input v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Create password" class="pr-10" required />


                            <button type="button"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                                @click="showPassword = !showPassword">


                                <Eye v-if="showPassword" class="h-5 w-5" />


                                <EyeOff v-else class="h-5 w-5" />


                            </button>


                        </div>


                    </div>


                    <div>
                        <label class="text-sm font-medium">
                            Confirm Password
                        </label>

                        <div class="relative">


                            <Input v-model="passwordConfirmation" :type="showConfirmPassword ? 'text' : 'password'"
                                placeholder="Confirm password" class="pr-10" required />



                            <button type="button"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                                @click="showConfirmPassword = !showConfirmPassword">


                                <Eye v-if="showConfirmPassword" class="h-5 w-5" />


                                <EyeOff v-else class="h-5 w-5" />


                            </button>


                        </div>
                    </div>

                    <div class="flex items-start gap-2 text-sm">
                        <Checkbox id="terms" />

                        <label for="terms">
                            I agree to the
                            <a href="/terms" class="text-primary hover:underline">
                                Terms of Service
                            </a>
                            and
                            <a href="/privacy" class="text-primary hover:underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <Button class="w-full" type="submit" :disabled="auth.loading">

                        <span v-if="auth.loading">
                            Creating account...
                        </span>


                        <span v-else>
                            Register
                        </span>


                    </Button>

                </form>


                <div class="mt-6 text-center text-sm text-muted-foreground">

                    Already have an account?

                    <a href="/login" class="text-primary font-medium hover:underline">
                        Login
                    </a>

                </div>

            </CardContent>

        </Card>
    </div>
</template>