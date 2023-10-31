//store.js:

import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            // token数据，登录时装载
            token: {},
            role: null,
            info: {}
        }
    },
    getters:{
        getToken(state) {
            return state.token
        },
        getRole(state) {
            return state.type
        },
        getInfo(state) {
            return state.info
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setRole(state, role) {
            state.role = role
        },
        setInfo(state, info) {
            state.info = info
        },
    },
    actions: {
        setTokenAction(context, token) {
            context.commit('setToken', token);
        },
        setRoleAction(context, role) {
            context.commit('setRole', role);
        },
        setInfoAction(context, info) {
            context.commit('setInfo', info);
        },
    }
})

export default store