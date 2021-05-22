import axios from "axios";
import store from "@/store";
import useAuthenticationChecking from "@/composables/useAuthenticationChecking";

const API_ENDOINT =
    import.meta.env.VITE_APP_API_ENDPOINT;

const httpClient = axios.create({
    baseURL: API_ENDOINT,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const refreshTokenHttpClient = axios.create({
    baseURL: API_ENDOINT,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

httpClient.setToken = (token) => {
    httpClient.defaults.headers["common"]["Authorization"] = `Bearer ${token}`;
};

httpClient.interceptors.request.use(
    async(request) => {
        const { isNeedRefreshToken, isAuthenticated, token, auth } = useAuthenticationChecking();

        if (isNeedRefreshToken) {
            store.dispatch('auth/setIsRefreshingState', true);

            await refreshTokenHttpClient
                .post("refresh-token")
                .then((response) => {
                    store.dispatch("auth/setToken", {
                        token: response.data.token,
                        expiresIn: response.data.expiresIn
                    });
                    request.headers["common"]["Authorization"] = `Bearer ${response.data.token}`;
                })
                .catch((e) => {
                    store.dispatch("auth/logout");
                    window.location =
                        import.meta.env.VITE_APP_BASE_URL + "login";
                });

            store.dispatch('auth/setIsRefreshingState', false);
        } else {
            request.headers["common"]["Authorization"] = `Bearer ${token}`;
        }

        return request;
    },
    (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {

        // check if it's a server error
        if (!error.response) {
            return Promise.reject(error);
        }

        // all the error responses
        switch (error.response.status) {
            case 422:
                // Save form validation error from server to vuex state
                store.dispatch("errorBag/setData", {
                    errors: error.response.data.errors,
                    message: error.response.data.message,
                });

                // console.error(error.response.status, error.response);
                break;

            case 403:
                store.dispatch("errorBag/setData", {
                    errors: null,
                    message: error.response.data.message,
                });

                // console.error(error.response.status, error.message);
                break;

            case 401: // authentication error, logout the user
                store.dispatch("errorBag/setData", {
                    errors: null,
                    message: error.response.data.message,
                });

                store.dispatch("auth/logout");
                window.location =
                    import.meta.env.VITE_APP_BASE_URL + "login";

                break;

            default:
                // console.error(error.response.status, error.message);
        }

        return Promise.reject(error.response);
    }
);

export default httpClient;