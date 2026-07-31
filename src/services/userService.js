import api from "@/api/axios";

export default {

    getUsers() {
        return api.get("/users");
    },

    getRoles() {
        return api.get("/roles");
    },

    assignRole(userId, role) {
        return api.patch(`/users/${userId}/role`, {
            role,
        });
    }

};