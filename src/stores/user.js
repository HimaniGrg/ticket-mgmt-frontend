import { defineStore } from "pinia";
import userService from "@/services/userService";

export const useUserStore = defineStore("user", {

    state: () => ({
        users: [],
        roles: [],
    }),

    actions: {

        async fetchUsers() {

            const response = await userService.getUsers();

            this.users = response.data.data;

        },

        async fetchRoles() {

            const response = await userService.getRoles();

            this.roles = response.data;

        }

    }

});