import api from "@/api/axios";

export default {

    getTickets(params = {}) {
        return api.get("/tickets", { params });
    },

    getTicket(id) {
        return api.get(`/tickets/${id}`);
    },

    createTicket(data) {
        return api.post("/tickets", data);
    },

    updateStatus(id, status) {
        return api.patch(`/tickets/${id}/status`, {
            status,
        });
    },

    assignTicket(id, assigned_to) {
        return api.patch(`/tickets/${id}/assign`, {
            assigned_to,
        });
    },

    addComment(id, body) {
        return api.post(`/tickets/${id}/comments`, {
            body,
        });
    },

    getComments(id) {
        return api.get(`/tickets/${id}/comments`);
    },

    getUsers() {
        return api.get("/users"); // Requires Admin role to fetch user/staff list
    }

};