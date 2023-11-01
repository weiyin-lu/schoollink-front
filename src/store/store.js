import { createStore } from 'vuex'
import session from "./session.js";

const store = createStore({
    state () {
        return {
            // token数据，登录时装载
            token: session.getValue('token'),
            role: session.getValue('role'),
            info: session.getValue('info')
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
            session.setValue('token',token)
        },
        setRole(state, role) {
            state.role = role
            session.setValue('role',role)
        },
        setInfo(state, info) {
            state.info = info
            session.setValue('info',info)
        },
        clearAll(state) {
            session.cleanValue('token')
            session.cleanValue('role')
            session.cleanValue('info')
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
        clearAllAction(context) {
            context.commit('clearAll')
        }
    }
})

export default store