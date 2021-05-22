import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import UserList from "./views/UserList.vue";
import AddUser from "./views/AddUser.vue";
import EditUser from "./views/EditUser.vue";
import ChangePassword from "./views/ChangePassword.vue";
import Profile from "./views/Profile.vue";
import ProfileChangePassword from "./views/ProfileChangePassword.vue";
import { useStore } from "vuex";

const store = useStore();

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [{
        path: "/",
        component: Dashboard,
        meta: { title: "Dashboard", authenticated: true },
        children: [{
                path: "/users",
                component: UserList,
                meta: {
                    title: "User List",
                    role: "admin",
                },
            },
            {
                path: "users/add",
                component: AddUser,
                meta: {
                    title: "User Add",
                    role: "admin",
                },
            },
            {
                path: "/users/:id",
                name: "user.edit",
                component: EditUser,
                meta: {
                    title: "User Edit",
                    role: "admin",
                },
            },
            {
                path: "/users/:id/change-password",
                name: "user.change-password",
                component: ChangePassword,
                meta: {
                    title: "Changes user password",
                    role: "admin",
                },
            },
            {
                path: "/profile",
                meta: { title: "Profile", role: 'any' },
                component: Profile,
            },
            {
                path: "/profile/change-password",
                meta: { title: "Profile - Change Password", role: 'any' },
                component: ProfileChangePassword,
            },
        ],
    },
    {
        path: "/login",
        meta: { title: "Login" },
        component: Login,
    },
    {
        path: "/:path(.*)",
        name: "not-found",
        component: NotFound,
        meta: { title: "404 - Page Not Found" },
    },
];