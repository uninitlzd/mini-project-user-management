import httpClient from '@/api/httpClient'
import authService from '@/api/auth.api'
import cookies from 'js-cookie'

const state = () => ({
    token: null,
    user: null,
    isRefreshing: false
});

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },

    SET_USER(state, user) {
        state.user = user;
    },

    SET_IS_REFRESHING_STATE(state, val) {
        state.isRefreshing = val;
    },

    REMOVE_TOKEN(state) {
        state.token = null;
    },

    REMOVE_USER(state) {
        state.user = null;
    }
};

const actions = {
    setToken({ commit }, { token, expiresIn }) {
        httpClient.setToken(token);
        const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
        cookies.set('x-access-token', token, { expires: expiryTime });
    },

    async refreshToken({ dispatch }) {
        await authService.refreshToken().then((response) => {
            const { token, expiresIn } = response.data
            dispatch('setToken', { token, expiresIn });
        });
    },

    setUser({ commit }, user) {
        cookies.set('user_id', user.id)
        commit('SET_USER', user);
    },

    setIsRefreshingState({ commit }, val) {
        commit('SET_IS_REFRESHING_STATE', val);
    },

    logout({ commit }) {
        httpClient.setToken(false);
        cookies.remove('x-access-token');
        commit('REMOVE_TOKEN');
        commit('SET_USER', null)
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};