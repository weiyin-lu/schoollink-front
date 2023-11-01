<template>
  <el-tag>当前班级: {{ gradeFormat(vuex.state.info.grade) }}</el-tag>

  <div id="pad">
    <el-input style="width: 300px" v-model="idQuery" placeholder="学号"/>
    <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
    <el-button type="primary">搜索</el-button>
  </div>

  <el-table :data="studentList">
    <el-table-column prop="uniqueId" label="学号"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
    <el-table-column label="家长信息">
      <template v-slot:default="scope">
        <el-popover trigger="hover" placement="right" width="200px">
          <template #reference>
            <el-button @mouseover="getParentInfo(scope.row.parents)">家长信息</el-button>
          </template>
          <el-tag>家长</el-tag>{{ parentInfo.name }}
          <br />
          <el-tag>联系电话</el-tag>{{ parentInfo.contactPhone }}
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="contactPhone" label="联系方式（电话）" :formatter="nullFormat"/>
    <el-table-column prop="contactEmail" label="联系方式（邮箱）" :formatter="nullFormat"/>
    <el-table-column fixed="right" label="操作" width="300">
      <template #default>
        <el-button type="primary">发送通知</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
// 全局变量
const request = inject("$api")
const vuex = useStore()
// 数据列表
const studentList = ref([])
const gradeList = ref({})
const genderList = ref({})
const parentInfo = ref({})
// 格式化函数
const gradeFormat = (value) => {
  return gradeList.value[value]
}
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}
const nullFormat = (row, column, cellValue) => {
  if (cellValue == null) {
    return '暂无'
  } else {
    return cellValue
  }
}
// 数据获取
const getParentInfo = (value) => {
  request.getParentByUnique(value)
      .then(r => {
        if(r.data.data != null) {
          parentInfo.value = r.data.data
        } else {
          parentInfo.value = {
            name: "暂无",
            contactPhone: "暂无"
          }
        }
      })
}
onMounted(() => {
  // 获取格式化码表
  request.getCode('grade')
      .then(r => {
        gradeList.value = r.data.data;
      })
  // 获取格式化码表
  request.getCode("gender")
      .then(r => {
        genderList.value = r.data.data
      })
  // 获取当前教师的班级所有学生
  request.getStudentListByGrade(vuex.state.info.grade)
      .then(r => {
        studentList.value = r.data.data
      })
})
</script>

<style scoped>
#pad {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>