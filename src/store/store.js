//store.js:

import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            // token数据，登录时装载
            token: {},
            type: "",
            info: {}
        }
    },
    getters:{
        getToken(state) {
            return state.token
        },
        getType(state) {
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
        setType(state, type) {
            state.type = type
        },
        setInfo(state, info) {
            state.info = info
        },
    },
    actions: {
        setTokenAction(context, token) {
            context.commit('setToken', token);
        },
        setTypeAction(context, type) {
            context.commit('setType', type);
        },
        setInfoAction(context, info) {
            context.commit('setInfo', info);
        },
    }
})

export default store