<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetTrigger from "@/components/ui/sheet/SheetTrigger.vue";
import { createReusableTemplate } from "@vueuse/core";
import { CircleUser, Menu, UserCog2 } from "lucide-vue-next";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import DarkMode from "@/features/dark-mode/components/DarkMode.vue"
const [LinkTemplate, ReuseLinksTemplate] = createReusableTemplate();

const auth = useAuthStore();
</script>

<template>
  <LinkTemplate>
    <a href="#" class="flex items-center gap-2 text-lg font-semibold">
      <UserCog2 class="h-6 w-6" />
    </a>
    <RouterLink
      active-class="text-gray-900"
      class="text-muted-foreground transition-colors hover:text-foreground"
      :to="{ name: 'Dashboard' }"
    >
      Dashboard
    </RouterLink>
    <RouterLink
      active-class="text-gray-900"
      class="text-muted-foreground transition-colors hover:text-foreground"
      :to="{ name: 'Index' }"
    >
      Usuários
    </RouterLink>
  </LinkTemplate>
  <header
    v-if="auth.isAuthenticated"
    class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
  >
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
      <ReuseLinksTemplate />
    </nav>
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <ReuseLinksTemplate />
        </nav>
      </SheetContent>
    </Sheet>
    <div
      class="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4"
    >
            <DarkMode />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <CircleUser class="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="auth.logout()">Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
