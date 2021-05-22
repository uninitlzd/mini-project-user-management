import { createStore } from "vuex";

// Plugins
import createPersistedState from "vuex-persistedstate"

// Modules
import auth from "./modules/auth"
import errorBag from "./modules/errorBag"

export default createStore({
    modules: {
        auth,
        errorBag
    },
    plugins: [
        createPersistedState({
            paths: ['auth']
        })
    ]
})