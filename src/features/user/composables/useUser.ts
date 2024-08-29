import { useMutation, useQuery } from "@tanstack/vue-query";
import userApi from "@/lib/api";
import { UserParams } from "../types/userType";
import { toast, ToastAction } from "@/components/ui/toast";
import { h, Ref } from "vue";
import { z } from "zod";

export const userSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  data: z.array(
    z.object({
      id: z.number(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    })
  ),
  support: z.object({ url: z.string(), text: z.string() }),
});

export type User = z.infer<typeof userSchema>;

async function getUsers() {
  const response = await userApi.get(`users`);
  return userSchema.parse(response.data);
}

export function useGetUser(params?: Ref<UserParams>) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: getUsers,
  });
}

export function usePostUser() {
  return useMutation({
    mutationFn: (userData: { name: string; email: string }) =>
      userApi.post("users", userData),
    onSuccess: ({ data }) => {
      toast({
        title: "Salvo!",
        description: `Usuário ${data.name} com id ${data.id} criado.`,
        variant: "default",
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

export function usePutUser() {
  return useMutation({
    mutationFn: (userData: { id?: number; name: string; email: string }) =>
      userApi.post(`users/${userData.id}`, userData),
    onSuccess: ({ data }) => {
      toast({
        title: "Atualizado!",
        description: `Usuário ${data.name} com id ${data.id} atualizado.`,
        variant: "default",
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

export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId: number) => userApi.delete(`users/${userId}`),
    onSuccess: () => {
      toast({
        title: "Excluido!",
        description: `Usuário excluido.`,
        variant: "default",
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
