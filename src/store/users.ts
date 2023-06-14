import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: ref<User[]>([]),
    isLoading: ref(false),
  }),
  actions: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const { data } = await api.get<User[]>(`/users`);
        this.isLoading = false;
        this.users = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
});
