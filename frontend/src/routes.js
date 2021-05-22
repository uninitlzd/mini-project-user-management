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
        meta: { title: "Dashboard" },
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
            {
                path: "/users/:id/change-password",
                name: "user.change-password",
                component: ChangePassword,
            },
            {
                path: "/profile",
                meta: { title: "Profile" },
                component: Profile,
            },
            {
                path: "/profile/change-password",
                meta: { title: "Profile - Change Password" },
                component: ProfileChangePassword,
            },
        ],
    },
    {
        path: "/login",
        meta: { title: "Login" },
        component: Login,
    },
    { path: "/:path(.*)", name: 'not-found', component: NotFound },
];