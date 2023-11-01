<template>
  <el-tag>当前班级: {{ gradeFormat(vuex.state.info.grade) }}</el-tag>
  <el-table :data="studentList">
    <el-table-column prop="uniqueId" label="学号" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="gender" label="性别" />
    <el-table-column prop="parents" label="负责家长" />
    <el-table-column fixed="right" label="操作" width="300">
      <template #default>
        <el-button>修改家长信息</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";

const request = inject("$api")
const vuex = useStore()

const studentList = ref([])
const gradeList = ref({})

const gradeFormat = (value) => {
  return gradeList.value[value]
}

onMounted(() => {
  request.getCode('grade')
      .then(r => {
        gradeList.value = r.data.data;
      })
  request.getStudentListByGrade(vuex.state.info.grade)
      .then(r => {
        studentList.value = r.data.data
      })
})
</script>

<style scoped>
</style>