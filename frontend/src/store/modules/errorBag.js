// Save form errors response from Laravel

const state = () => {
    return {
        errors: null,
        message: null
    };
};

// getters
const getters = {
    errors: state => state.errors,
    errorMessage: state => state.message,
};
// actions
const actions = {
    async setData({ commit }, data) {
        commit("SET_ERRORS", data);
    },
    async clear({ commit }) {
        commit("SET_ERRORS", {
            errors: null,
            message: null
        });
    },
};

// mutations
const mutations = {
    SET_ERRORS(state, { errors, message }) {
        state.errors = errors;
        state.message = message;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};