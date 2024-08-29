<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/button/Button.vue";
import { Trash2 } from "lucide-vue-next";
import { useDeleteUser } from "../composables/useUser";

const props = defineProps<{
  userId: number;
}>();

const { mutateAsync: deleteUser } = useDeleteUser();
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button size="icon" variant="ghost">
        <Trash2 class="sm:size-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Deseja continuar?</AlertDialogTitle>
        <AlertDialogDescription>
          Isso excluirá permanentemente seu usuário e removerá seus dados.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="deleteUser(props.userId)"
          >Confirmar</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
