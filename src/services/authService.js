import api from "@/api/axios";

export default {

    login(credentials) {
        return api.post("/login", credentials);
    },

    register(data) {
        return api.post("/register", data);
    },

    logout() {
        return api.post("/logout");
    },

    me() {
        return api.get("/me");
    }

};