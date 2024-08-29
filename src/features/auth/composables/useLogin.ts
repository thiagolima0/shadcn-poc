import userApi from "@/lib/api";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "vue-router";
import { toast } from "@/components/ui/toast";
import ToastAction from "@/components/ui/toast/ToastAction.vue";
import { h } from "vue";

export function useLogin() {
  const auth = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (loginData: { email: string; password: string }) =>
      userApi.post("login", loginData),
    onSuccess: ({ data }) => {
      auth.setToken(data.token);
      localStorage.setItem("token", data.token);
      router.push("/");
    },

    onError: () => {
      toast({
        title: "Login inválido",
        description: `Email ou senha inválidos.`,
        variant: "destructive",
        action: h(
          ToastAction,
          {
            altText: "Fechar",
          },
          {
            default: () => "Fechar",
          }
        ),
      });
    },
  });
}
