import { defineStore } from "pinia";
import authService from "@/services/authService";

export const useAuthStore = defineStore("auth", {

    state: () => ({
        user: null,
        token: localStorage.getItem("token"),
        loading: false,
    }),

    getters: {

        isAuthenticated: (state) => !!state.token,

        userRole: (state) => state.user?.role ?? null,

    },

    actions: {

        async login(credentials) {

            this.loading = true;

            try {

                const response = await authService.login(credentials);

                this.token = response.data.token;

                localStorage.setItem("token", this.token);

                await this.fetchUser();

                return response;

            } finally {

                this.loading = false;

            }

        },

        async register(data) {

            this.loading = true;

            try {

                const response = await authService.register(data);

                this.token = response.data.token;

                localStorage.setItem("token", this.token);

                await this.fetchUser();

                return response;

            } finally {

                this.loading = false;

            }

        },

        async fetchUser() {

            const response = await authService.me();

            this.user = response.data.data;

        },

        async logout() {

            try {

                await authService.logout();

            } catch (e) {}

            this.user = null;

            this.token = null;

            localStorage.removeItem("token");

        }

    }

});