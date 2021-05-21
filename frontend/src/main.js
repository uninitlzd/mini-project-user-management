import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import {
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElLoading
} from 'element-plus'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)


const plugins = [
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElLoading
]

plugins.forEach(plugin => {
    app.use(plugin)
})

app.mount('#app')