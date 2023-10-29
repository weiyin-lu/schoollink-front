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
  const login = (loginInfo) => {
    request.login(loginInfo)
        .then(resp => {
          if(resp.data.code == 200) {
            ElMessage.success(resp.data.msg)
            vuex.dispatch('setTokenAction', resp.data.data)
            router.push("/index")
          } else {
            ElMessage.warning(resp.data.msg)
          }
        })
  }

  const checkLogin = () => {
    request.isLogin()
        .then(resp => {
          if(resp.data.code == 200) {
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