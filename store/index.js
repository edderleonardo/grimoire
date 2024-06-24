import { defineStore } from "pinia";
import { listRequests, createRequest, deleteRequest } from "~/services/api";

export const userGrimoire = defineStore("grimoire", {
  state: () => ({
    requests: [],
  }),
  getters: {
    request: (state) => state.request,
  },
  actions: {
    async fetchRequest() {
      try {
        const response = await listRequests();
        this.requests = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async createRequest(request) {
      try {
        const response = await createRequest(request);
        this.requests.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteRequest(id) {
      try {
        await deleteRequest(id);
        this.requests = this.requests.filter((request) => request.id !== id);
      } catch (error) {
        console.error(error);
      }
    }
  },
});
