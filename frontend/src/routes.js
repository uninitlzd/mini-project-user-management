import Home from "./views/Home.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import UserList from "./views/UserList.vue";
import AddUser from "./views/AddUser.vue";
import EditUser from "./views/EditUser.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [{
        path: "/",
        component: Dashboard,
        children: [{
                path: "/users",
                component: UserList,
            },
            {
                path: "users/add",
                component: AddUser,
            },
            {
                path: "/users/:id",
                name: "user.edit",
                component: EditUser,
            },
        ],
    },
    {
        path: "/about",
        meta: { title: "About" },
        component: About,
        // example of route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('./views/About.vue')
    },
    {
        path: "/login",
        component: Login,
    },
    { path: "/:path(.*)", component: NotFound },
];