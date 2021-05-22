import { createApp, nextTick } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import {
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElLoading,
    ElIcon
} from "element-plus";
import cookies from "js-cookie";
import useAuthenticationChecking from "./composables/useAuthenticationChecking";
import httpClient from "./api/httpClient";

const app = createApp(App);

// Install router plugin
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const { isNeedRefreshToken, isAuthenticated, token } =
    useAuthenticationChecking();

    store.dispatch("errorBag/clear");

    if (to.path == '/') {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }

    next();
});

router.afterEach((to, from) => {
    // console.log(auth);
    nextTick(() => {
        document.title = to.meta.title;
    });
});

app.use(router);

// Install element-ui plugins
const plugins = [ElMessage, ElMessageBox, ElNotification, ElLoading, ElIcon];

plugins.forEach((plugin) => {
    app.use(plugin);
});

app.provide('$messageBox', app.config.globalProperties.$messageBox)
app.provide('$prompt', app.config.globalProperties.$prompt)
app.provide('$alert', app.config.globalProperties.$alert)
app.provide('$confirm', app.config.globalProperties.$confirm)

// Install Vuex store
app.use(store);

app.mount("#app");