<template>
  <el-tag id="pad">用户注册</el-tag>
  <div id="form">
    <div>
      <el-radio-group v-model="regData.userType">
        <el-radio label="1">教师</el-radio>
        <el-radio label="2">家长</el-radio>
        <el-radio label="3">学生</el-radio>
      </el-radio-group>
    </div>
    <div>
      <span id="mustinput">*必填</span>
      <el-input clearable size="large" placeholder="唯一代码(登录账号)" v-model="regData.username"/>
      <span id="mustinput">*必填</span>
      <el-input clearable size="large" placeholder="密码" v-model="regData.password"/>
      <span id="mustinput">*必填</span>
      <el-input clearable size="large" placeholder="姓名" v-model="regData.name"/>
    </div>
    <div v-if="regData.userType != 3">
      <span id="mustinput">*必填</span>
      <el-input clearable size="large" placeholder="联系电话" v-model="regData.phone"/>
    </div>
    <div id="pad">
      <el-select style="width: 300px" v-model="regData.gender" filterable size="large" placeholder="性别">
        <el-option v-for="item in Object.keys(genderList)"
                   :value="item"
                   :label="genderList[item]"
                   :key="item">
          {{ genderList[item] + "(" + item + ")" }}
        </el-option>
      </el-select>
    </div>
    <div>
      <el-select v-if="regData.userType != 2" style="width: 300px" v-model="regData.grade" filterable
                 size="large" placeholder="指定班级">
        <el-option v-for="item in Object.keys(gradeList)"
                   :value="item"
                   :label="gradeList[item]"
                   :key="item">
          {{ gradeList[item] + "(" + item + ")" }}
        </el-option>
      </el-select>
    </div>
    <div id="pad">
      <el-button type="success" size="large" @click="register()">注册</el-button>
    </div>
  </div>

</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

// 全局变量
const request = inject('$api')
// 数据列表
const genderList = ref({})
const gradeList = ref({})
const regData = ref({
  gender: null,
  grade: null,
  name: null,
  password: null,
  phone: null,
  userType: null,
  username: null
})

// 登录
const register = () => {
  request.register(regData.value)
      .then(r => {
        if (r.data.code == 200) {
          ElMessage.success(r.data.msg)
          regData.value = {
            gender: null,
            grade: null,
            name: null,
            password: null,
            phone: null,
            userType: null,
            username: null
          }
        } else {
          ElMessage.error(r.data.msg)
        }
      })
}

// 初始化
onMounted(() => {
  request.getCode("gender")
      .then(r => {
        genderList.value = r.data.data
      })
  request.getCode("grade")
      .then(r => {
        gradeList.value = r.data.data
      })

})
</script>

<style scoped>
#pad {
  padding-bottom: 10px;
  padding-top: 10px;
}

#form {
  width: 400px;
  margin: 0 auto
}

#mustinput {
  padding-bottom: 10px;
  padding-top: 10px;
  color: red;
  font-size: 12px;
}
</style>