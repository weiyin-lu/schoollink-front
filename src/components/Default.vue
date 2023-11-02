<template>
  <div>
    <el-tag>个人信息</el-tag>
    <el-divider />
    <el-card>
      <template #header>
        欢迎你，{{ vuex.state.info.name }}
      </template>
      <div><el-tag>身份</el-tag> {{ roleFormat(vuex.state.role) }}</div>
      <div><el-tag>账号</el-tag> {{ vuex.state.info.uniqueId }}</div>
      <div v-if="vuex.state.role != 'admin'"><el-tag>联系电话</el-tag> {{ vuex.state.info.contactPhone }}</div>
      <div v-if="vuex.state.role != 'admin'"><el-tag>联系邮箱</el-tag> {{ vuex.state.info.contactEmail }}</div>
      <div v-if="vuex.state.role == '1'"><el-tag>管理班级</el-tag> {{ gradeFormat(vuex.state.info.grade) }}</div>
      <div v-if="vuex.state.role == '2'"><el-tag>所在班级</el-tag> {{ gradeFormat(vuex.state.info.grade) }}</div>
      <el-divider />
      <el-button type="primary">修改个人信息</el-button>
    </el-card>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";

const request = inject('$api')
const vuex = useStore();
// 数据列表
const roleList = ref({})
const gradeList = ref({})
// 格式化
const roleFormat = (value) => {
  return roleList.value[value]
}
const gradeFormat = (value) => {
  return gradeList.value[value]
}
// 页面初始化数据
onMounted(() => {
  request.getCode('user_type')
      .then(r => {
        roleList.value = r.data.data;
      })
  request.getCode('grade')
      .then(r => {
        gradeList.value = r.data.data;
      })
})
</script>

<style scoped>

</style>