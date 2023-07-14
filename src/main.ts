// main.ts
import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Boss from "./pages/Boss.vue";
import Login from "./pages/Login.vue";

const app = createApp(App);

const routes = [
  // { path: "/", component: Boss },
  { path: "/boss", component: Boss },
  { path: "/login", component: Login },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

app.use(ElementPlus);
app.use(router);

app.mount("#app");
