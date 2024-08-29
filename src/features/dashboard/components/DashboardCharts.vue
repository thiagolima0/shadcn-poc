<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import AreaChart from "@/components/ui/chart-area/AreaChart.vue";
import LineChart from "@/components/ui/chart-line/LineChart.vue";
import { line, area } from "../data";
</script>

<template>
  <div class="grid gap-4 flex-1 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Usuários Ativos </CardTitle>
        <CreditCard class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">+12,234</div>
        <p class="text-xs text-muted-foreground">+19% mês passado</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Usuários </CardTitle>
        <Activity class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">+573</div>
        <p class="text-xs text-muted-foreground">+201 na última hora</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
      </CardHeader>
      <CardContent>
        <AreaChart
          :data="area"
          index="name"
          :categories="['total', 'predicted']"
        />
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <LineChart
          :data="line"
          index="year"
          :show-legend="true"
          :categories="['Export Growth Rate', 'Import Growth Rate']"
        ></LineChart>
      </CardContent>
    </Card>
  </div>
</template>
