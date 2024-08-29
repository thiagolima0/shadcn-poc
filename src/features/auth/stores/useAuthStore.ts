import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const token = ref<string | null>(null);
  const isAuthenticated = computed(() => token.value !== null);

  function setToken(newToken: string | null) {
    token.value = newToken;
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  }

  return { token, isAuthenticated, setToken, logout };
});
