<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const props = defineProps<{
  length: number;
}>();
</script>

<template>
  <TableBody v-for="i in props.length">
    <TableRow :key="i">
      <TableCell class="hidden sm:table-cell">
        <Skeleton
          class="sm:size-[64px] aspect-square rounded-md object-cover"
        />
      </TableCell>
      <TableCell class="font-medium">
        <Skeleton class="sm:w-[100px] size-10 sm:h-5" />
      </TableCell>
      <TableCell>
        <Skeleton class="w-[100px] h-5" />
      </TableCell>
      <TableCell>
        <Skeleton class="sm:w-[100px] size-10 sm:h-5" />
      </TableCell>
    </TableRow>
  </TableBody>
</template>
