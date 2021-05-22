import { ref } from "@vue/reactivity";
import cookies from "js-cookie"
import store from "@/store"

export default function useAuthenticationChecking() {
    const auth = store.state.auth;

    const token = cookies.get('x-access-token');
    const user_id = cookies.get('user_id');

    const isAdmin = ref(false);
    const isAuthenticated = (auth.user != null) ? true : false;

    // Determine if access token has expired and user not logged out yet
    const isNeedRefreshToken = (auth.user != null && !token) ? true : false;

    if (auth.user != null) {
        isAdmin.value = auth.user.is_admin;
    }

    return {
        auth,
        token,
        user_id,
        isAdmin,
        isAuthenticated,
        isNeedRefreshToken
    }
}