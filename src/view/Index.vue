<template>
  <el-container>
    <el-header>
      <el-menu
          id="header"
          router
          background-color="#f47983"
          text-color="#f9f9f9"
          active-text-color="#f9f9f9"
          mode="horizontal">
          <span id="title">
            SchoolLink学生管理系统
          </span>
        <el-menu-item
            id="my"
            index="default">
          我的信息
        </el-menu-item>
        <el-menu-item @click="dialogVisible = true">
          登出
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
            router
            default-active="/index"
            id="aside"
            background-color="f9f9f9"
            text-color="#f47983">
          <el-menu-item v-if="vuex.state.role[0] == 'admin'" index="teacherList">教师管理</el-menu-item>
          <el-menu-item v-if="vuex.state.role[0] == 'admin'" index="studentList">学生管理</el-menu-item>
          <el-menu-item v-if="vuex.state.role[0] == 'admin'" index="parentList">家长管理</el-menu-item>
          <el-menu-item v-if="vuex.state.role[0] == 'admin'" index="dicList">字典管理</el-menu-item>
          <el-menu-item v-if="vuex.state.role[0] == 'admin'" index="register">用户注册</el-menu-item>
          <el-menu-item v-if="vuex.state.role[0] == '1'" index="gradeManage">班级管理</el-menu-item>
          <el-menu-item index="noticeList">通知</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog
      v-model="dialogVisible"
      title="登出">
    确认登出？
    <template #footer>
      <el-button @click="logout()">确认</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const request = inject("$api")
const router = useRouter()
const vuex = useStore()

const dialogVisible = ref(false)
const logout = () => {
  request.logout()
      .then(resp => {
        if (resp.data.code == 200) {
          // 清空vuex
          vuex.dispatch('clearAllAction')
          ElMessage.success(resp.data.msg)
        }
      })
  router.push("/login")
}
</script>

<style scoped>
#header {
  height: 50px;
  border-radius: 5px;
}

#title {
  font-size: 20px;
  color: #f9f9f9;
  line-height: 45px;
  padding-left: 15px;
  padding-right: 15px;
}

#my {
  font-size: 15px;
}

#aside {
  padding-left: 20px;
}
</style>