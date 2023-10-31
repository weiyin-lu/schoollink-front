<template>
  <el-input type="text" placeholder="账号" v-model="loginInfo.username"/>
  <el-input type="password" placeholder="密码" v-model="loginInfo.password"/>
  <el-button type="primary" @click="login(loginInfo)">登录</el-button>
  <el-button type="primary" @click="checkLogin()">检查登录状态</el-button>
  <el-button type="primary" @click="logout()">登出</el-button>
</template>

<script setup>
import {inject, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const request = inject('$api')
const vuex = useStore()
const router = useRouter()

const loginInfo = ref({
  password: "",
  username: ""
})
const login = async (loginInfo) => {
  await request.login(loginInfo)
      .then(r => {
        if (r.data.code == 200) {
          ElMessage.success(r.data.msg)
          // token录入到vuex
          vuex.dispatch('setTokenAction', r.data.data)
          // 当前用户身份录入到vuex
          request.getRole()
              .then(r2 => {
                vuex.dispatch('setRoleAction', r2.data.data)
              })
          // 当前用户信息录入到vuex
          request.getInfo()
              .then( r3 => {
                vuex.dispatch('setInfoAction', r3.data.data)
              })
          router.push("/index")
        } else {
          ElMessage.warning(r.data.msg)
        }
      })
}

const checkLogin = () => {
  request.isLogin()
      .then(resp => {
        if (resp.data.code == 200) {
          ElMessage.success(resp.data.msg)
        } else {
          ElMessage.warning(resp.data.msg)
        }
      })
}

const logout = () => {
  request.logout()
      .then(resp => {
        if (resp.data.code == 200) {
          ElMessage({
            message: resp.data.msg,
            type: "success"
          })
        }
      })
}
</script>

<style scoped>
</style>