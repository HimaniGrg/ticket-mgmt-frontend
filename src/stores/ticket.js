import { defineStore } from "pinia";
import ticketService from "@/services/ticketService";

export const useTicketStore = defineStore("ticket", {

    state: () => ({
        tickets: [],
        ticket: null,
        loading: false,
    }),

    actions: {

        async fetchTickets(filters = {}) {

            this.loading = true;

            try {

                const response = await ticketService.getTickets(filters);

                this.tickets = response.data.data;

            } finally {

                this.loading = false;

            }

        },

        async fetchTicket(id) {

            const response = await ticketService.getTicket(id);

            this.ticket = response.data.data;

        }

    }

});