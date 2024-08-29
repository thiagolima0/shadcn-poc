<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "../composables/useAuthForm";
import { useLogin } from "../composables/useLogin";

const { email, password, errors, handleSubmit } = useAuthForm();
const { mutateAsync: login, isPending: isLoading } = useLogin();

const onSubmit = handleSubmit(async (values) => {
  await login(values);
});
</script>

<template>
  <div class="flex flex-col justify-center min-h-screen">
    <Card class="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl"> Acesso </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="email@mail.com"
              v-model="email"
            />
            <span class="text-red-400 text-xs">{{ errors.email }}</span>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Senha</Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              v-model="password"
            />
            <span class="text-red-400 text-xs">{{ errors.password }}</span>
          </div>
          <Button :isLoading="isLoading" type="submit" class="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
