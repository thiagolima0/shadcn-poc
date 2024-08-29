<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-vue-next";
import { useFormUser } from "../composables/useFormUser";
import { usePostUser, usePutUser, useGetUser } from "../composables/useUser";
import { UserData } from "../types/userType";
import { computed, inject } from "vue";
import { Ref } from "vue";

type UserInject = {
  currentUser: Ref<Partial<UserData> | null>;
  openModal: Ref<boolean>;
  updateModal: (state: boolean) => void;
  updateCurrentUser: (user: { name: string; email: string } | null) => void;
};

const [FormTemplate, ReuseFormTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");
const { name, email, errors, handleSubmit, resetForm, setValues } =
  useFormUser();

const { mutateAsync: createUser, isPending: isCreatingUser } = usePostUser();
const { mutateAsync: updateUser, isPending: isUpdatingUser } = usePutUser();
const { refetch: updateUserList } = useGetUser();

const {  currentUser, openModal, updateModal, updateCurrentUser} = inject(
  "currentUser"
) as UserInject;

const userExists = computed(() => {
  if (!!currentUser.value?.id && openModal.value) {
    editUser();
    return true;
  }
  return false;
});

function editUser() {
  updateModal(true);
  setValues({
    name: `${currentUser.value?.first_name} ${currentUser.value?.last_name}`,
    email: currentUser.value?.email,
  });
}

const onSubmit = handleSubmit(async (values) => {
  if (userExists.value) {
    await updateUser({ ...currentUser.value, ...values });
    updateCurrentUser(null);
  } else {
    await createUser(values);
  }
  updateModal(false);
  resetForm();
  updateUserList();
});

function clearUser() {
  updateCurrentUser(null);
  updateModal(false);
  resetForm();
}
</script>

<template>
  <FormTemplate>
    <form @submit.prevent="onSubmit" class="grid items-start gap-4 px-4">
      <div class="grid gap-2">
        <Label html-for="name">Nome</Label>
        <Input id="name" name="name" v-model="name" />
        <span class="text-red-400 text-xs">{{ errors.name }}</span>
      </div>
      <div class="grid gap-2">
        <Label html-for="email">Email</Label>
        <Input id="email" name="email" v-model="email" />
        <span class="text-red-400 text-xs">{{ errors.email }}</span>
      </div>
      <Button :isLoading="isCreatingUser || isUpdatingUser" type="submit">
        Salvar
      </Button>
    </form>
  </FormTemplate>

  <Dialog v-if="isDesktop" v-model:open="openModal">
    <DialogTrigger as-child>
      <Button class="gap-2">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Adicionar Usuário
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent @close-auto-focus="clearUser()" class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle
          >{{ userExists ? "Editar" : "Adicionar" }} Usuário</DialogTitle
        >
      </DialogHeader>
      <ReuseFormTemplate />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="openModal">
    <DrawerTrigger as-child>
      <Button class="gap-2">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Adicionar Usuário
        </span>
      </Button>
    </DrawerTrigger>
    <DrawerContent @close-auto-focus="clearUser()">
      <DrawerHeader class="text-left">
        <DrawerTitle
          >{{ userExists ? "Editar" : "Adicionar" }} Usuário</DrawerTitle
        >
      </DrawerHeader>
      <ReuseFormTemplate />
      <DrawerFooter class="pt-2 pb-10">
        <DrawerClose as-child>
          <Button variant="outline"> Cancelar </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
