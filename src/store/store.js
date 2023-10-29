//store.js:

import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            // token数据，登录时装载
            token: {}
        }
    },
    getters:{
        getToken(state) {
            return state.token
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        setTokenAction(context, token) {
            context.commit('setToken', token);
        }
    }
})

export default store