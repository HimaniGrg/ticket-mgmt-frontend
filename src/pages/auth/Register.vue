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

                <form class="space-y-4">

                    <div>

                        <label class="text-sm">
                            Full Name
                        </label>

                        <Input type="text" placeholder="Enter your full name" autocomplete="name" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Username
                        </label>

                        <Input type="text" placeholder="Choose a username" autocomplete="username" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Email
                        </label>

                        <Input type="email" placeholder="Enter your email" autocomplete="email" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Password
                        </label>

                        <Input type="password" placeholder="Create a password" autocomplete="new-password" />

                    </div>


                    <div>

                        <label class="text-sm">
                            Confirm Password
                        </label>

                        <Input type="password" placeholder="Confirm your password" autocomplete="new-password" />

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

                    <Button class="w-full">
                        Create Account
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