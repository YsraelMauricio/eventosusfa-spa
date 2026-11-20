import { defineStore } from 'pinia';
import { ref } from 'vue';
import { post, setToken } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: ref(null),
    token: ref(localStorage.getItem('token')),
  }),
  actions: {
    async login(email, password) {
      const data = await post('/auth/login', { email, password });
      this.token.value = data.token;
      this.usuario.value = data.user;
      setToken(data.token);
      return data;
    },
    async register(payload) {
      const data = await post('/auth/register', payload);
      this.token.value = data.token;
      this.usuario.value = data.user;
      setToken(data.token);
      return data;
    },
    async logout() {
      try {
        await post('/auth/logout', {}, { requiresAuth: true });
      } finally {
        this.token.value = null;
        this.usuario.value = null;
        setToken(null);
      }
    },
    async fetchMe() {
      const data = await post('/auth/me', {}, { requiresAuth: true });
      this.usuario.value = data;
      return data;
    },
  },
});

export const useSession = useAuthStore;
