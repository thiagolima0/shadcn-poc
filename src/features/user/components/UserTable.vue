<script setup lang="ts">
import { useGetUser } from "../composables/useUser";
import { UserData, UserParams } from "../types/userType";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Search } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserLoading from "./UserLoading.vue";
import UserAdd from "./UserAdd.vue";
import UserDelete from "./UserDelete.vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { ref, provide, watch } from "vue";

const pagination = ref<UserParams>({
  page: 1,
  delay: 1,
  per_page: 4,
});

const { data: users, isFetching } = useGetUser(pagination);
const search = ref("");
const filteredUsers = ref();

watch(users, () => {
  filteredUsers.value = users.value;
});

function filterUserbyName(value: string | number) {
  const filteredData = users.value?.data.filter((user: any) => {
    return `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(
      value.toString().toLowerCase()
    );
  })
  filteredUsers.value = { ...filteredUsers.value, data: filteredData };
}

function handlePage(page: number) {
  pagination.value.page = page;
}

const openModal = ref(false);
function updateModal(state: boolean) {
  openModal.value = state;
}

const currentUser = ref<UserData | null>(null);
function updateCurrentUser(user: UserData | null) {
  currentUser.value = user;
  openModal.value = true;
}

provide("currentUser", {
  currentUser,
  openModal,
  updateModal,
  updateCurrentUser,
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription>
        <div class="flex relative flex-1 justify-between gap-x-4">
          <Search
            class="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
          />
          <Input
            v-model="search"
            @update:model-value="filterUserbyName($event)"
            type="search"
            placeholder="Pesquisar por nome..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
          <UserAdd />
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="hidden w-[100px] sm:table-cell"> </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <template v-if="isFetching">
          <user-loading :length="filteredUsers?.data?.length || 4" />
        </template>
        <TableBody v-else v-for="user in filteredUsers.data">
          <TableRow>
            <TableCell class="hidden sm:table-cell">
              <img
                class="aspect-square rounded-md object-cover"
                height="64"
                width="64"
                :src="user.avatar"
              />
            </TableCell>
            <TableCell class="font-medium">
              {{ user.first_name }} {{ user.last_name }}
            </TableCell>
            <TableCell>
              {{ user.email }}
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      @click="updateCurrentUser(user)"
                      size="icon"
                      variant="ghost"
                    >
                      <Pencil class="sm:size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Editar</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <UserDelete :user-id="user.id" />
                  </TooltipTrigger>
                  <TooltipContent>Excluir</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter class="flex-1 flex justify-between">
      <div v-if="filteredUsers?.data?.length === 0">
        <span class="text-muted-foreground"> Nenhum usuário encontrado </span>
      </div>

      <template v-else>
        <div class="text-muted-foreground">
          Exibindo
          <strong>{{ filteredUsers?.data?.length }}</strong>
          de
          <strong>{{ filteredUsers?.total }} </strong>
          usuários
        </div>

        <Pagination
          v-slot="{ page }"
          :total="filteredUsers?.total"
          :page="filteredUsers?.page"
          :items-per-page="filteredUsers?.per_page"
          :show-edges="true"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationPrev @click="handlePage(page - 1)" />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  @click="handlePage(item.value)"
                  class="w-10 h-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="handlePage(page + 1)" />
          </PaginationList>
        </Pagination>
      </template>
    </CardFooter>
  </Card>
</template>
