<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/toast";
import HeaderLayout from "./layout/HeaderLayout.vue";
import { useAuthStore } from "./features/auth/stores/useAuthStore";

const { setToken } = useAuthStore();

setToken(localStorage.getItem("token"));
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <HeaderLayout />
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <RouterView />
    </main>
  </div>
  <Toaster />
</template>
