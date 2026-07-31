// src/stores/ticketStore.js
import { defineStore } from "pinia";
import ticketService from "@/services/ticketService";

export const useTicketStore = defineStore("ticket", {
    state: () => ({
        tickets: [],
        ticket: null,
        comments: [],
        users: [],
        loading: false,
    }),

    getters: {
        openCount: (state) => state.tickets.filter(t => t.status === 'Open').length,
        inProgressCount: (state) => state.tickets.filter(t => t.status === 'In Progress').length,
        resolvedCount: (state) => state.tickets.filter(t => t.status === 'Resolved').length,
        closedCount: (state) => state.tickets.filter(t => t.status === 'Closed').length,
    },

    actions: {
        async fetchTickets(filters = {}) {
            this.loading = true;
            try {
                // filters can contain { status: 'Open', priority: 'High' }
                const response = await ticketService.getTickets(filters);
                this.tickets = response.data.data;
            } finally {
                this.loading = false;
            }
        },

        async fetchTicket(id) {
          this.loading = true;
            try {
                const response = await ticketService.getTicket(id);
                // Handle both wrapped Laravel API resources and raw objects safely
                this.ticket = response.data.data || response.data;
            } finally {
                this.loading = false;
            }
        },

        async createTicket(data) {
            this.loading = true;
            try {
                const response = await ticketService.createTicket(data);
                this.tickets.unshift(response.data.data);
                return response.data.data;
            } finally {
                this.loading = false;
            }
        },

        async updateStatus(id, status) {
            const response = await ticketService.updateStatus(id, status);
            if (this.ticket && this.ticket.id === Number(id)) {
                this.ticket.status = status;
            }
            return response.data.data;
        },

        async assignTicket(id, assignedToId) {
            const response = await ticketService.assignTicket(id, assignedToId);
            if (this.ticket && this.ticket.id === Number(id)) {
                this.ticket = response.data.data;
            }
            return response.data.data;
        },

        async fetchComments(id) {
            const response = await ticketService.getComments(id);
            this.comments = response.data.data || response.data;
        },

        async addComment(id, body) {
            const response = await ticketService.addComment(id, body);
            this.comments.push(response.data.data);
        },

        async fetchStaffUsers() {
            const response = await ticketService.getUsers();
            this.users = response.data.data || response.data;
        }
    }
});