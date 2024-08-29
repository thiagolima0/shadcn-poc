import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import "./assets/index.css";
import { router } from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(VueQueryPlugin).use(pinia).use(router).mount("#app");
