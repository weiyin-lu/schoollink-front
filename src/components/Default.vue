<template>
  <div>
    <el-tag>个人信息</el-tag>
    <el-divider/>
    <el-card>
      <template #header>
        欢迎你，{{ vuex.state.info.name }}
      </template>
      <div>
        <el-tag>身份</el-tag>
        {{ roleFormat(vuex.state.role) }}
      </div>
      <div>
        <el-tag>账号</el-tag>
        {{ vuex.state.info.uniqueId }}
      </div>
      <div v-if="vuex.state.role != 'admin'">
        <el-tag>联系电话</el-tag>
        {{ vuex.state.info.contactPhone }}
      </div>
      <div v-if="vuex.state.role != 'admin'">
        <el-tag>联系邮箱</el-tag>
        {{ vuex.state.info.contactEmail }}
      </div>
      <div v-if="vuex.state.role == '1'">
        <el-tag>管理班级</el-tag>
        {{ gradeFormat(vuex.state.info.grade) }}
      </div>
      <div v-if="vuex.state.role == '2'">
        <el-tag>所在班级</el-tag>
        {{ gradeFormat(vuex.state.info.grade) }}
      </div>
      <el-divider/>
      <el-button type="primary" @click="updateInfoBefore()">修改个人信息</el-button>
      <el-dialog v-model="dialogVisible" width="400px">
        <template #title>
          <h3>修改个人信息</h3>
        </template>
        <el-input type="text" v-model="updateData.contactPhone" placeholder="联系电话"/>
        <el-input type="email" v-model="updateData.contactEmail" placeholder="联系邮箱"/>
        <el-select v-model="updateData.gender" filterable placeholder="性别">
          <el-option v-for="item in Object.keys(genderList)"
                     :label="genderList[item]"
                     :key="item"
                     :value="item"/>
        </el-select>
        <template #footer>
          <el-button type="success" @click="updateInfo()">修改</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const request = inject('$api')
const vuex = useStore();
// 数据列表
const roleList = ref({})
const gradeList = ref({})
const genderList = ref({})
const updateData = ref({
  contactEmail: "",
  contactPhone: "",
  gender: ""
})
// 判断标识
const dialogVisible = ref(false)
// 格式化
const roleFormat = (value) => {
  return roleList.value[value]
}
const gradeFormat = (value) => {
  return gradeList.value[value]
}
// 更新个人信息数据装填
const updateInfoBefore = () => {
  dialogVisible.value = true
  updateData.value.contactEmail = vuex.state.info.contactEmail
  updateData.value.contactPhone = vuex.state.info.contactPhone
  updateData.value.gender = vuex.state.info.gender
}
// 更新个人信息
const updateInfo = () => {
  switch (vuex.state.role[0]) {
    case '1':
      request.updateTeacher(updateData.value)
          .then(r => ElMessage.success(r.data.msg))
      break;
    case '2':
      request.updateParent(updateData.value)
          .then(r => ElMessage.success(r.data.msg))
      break;
    case '3':
      request.updateStudent(updateData.value)
          .then(r => ElMessage.success(r.data.msg))
      break;
    default:
      ElMessage.warning("无效提交")
  }
  // 重新更新一次用户信息
  request.getInfo()
      .then(r3 => {
        vuex.dispatch('setInfoAction', r3.data.data)
      })
  dialogVisible.value = false
}
// 页面初始化数据
onMounted(() => {
  // 格式化码表
  request.getCode('user_type')
      .then(r => {
        roleList.value = r.data.data;
      })
  // 格式化码表
  request.getCode('grade')
      .then(r => {
        gradeList.value = r.data.data;
      })
  // 格式化码表
  request.getCode('gender')
      .then(r => {
        genderList.value = r.data.data;
      })
})
</script>

<style scoped>
#center {
  text-align: center;
}
</style>