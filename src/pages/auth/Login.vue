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

            <form class="space-y-4">

                <div>
                    <label class="text-sm">
                        Username
                    </label>

                    <Input type="text" placeholder="Enter your username" autocomplete="username" />
                </div>


                <div>

                    <div class="flex items-center justify-between">

                        <label class="text-sm">
                            Password
                        </label>

                        <a href="/forgot-password" class="text-sm text-primary hover:underline">
                            Forgot password?
                        </a>

                    </div>


                    <Input type="password" placeholder="Enter your password" autocomplete="current-password" />

                </div>


                <Button class="w-full">
                    Login
                </Button>


            </form>


            <div class="mt-6 text-center text-sm text-muted-foreground">

                Don't have an account?

                <a href="/register" class="text-primary font-medium hover:underline">
                    Create account
                </a>

            </div>


        </CardContent>


    </Card>


</template>