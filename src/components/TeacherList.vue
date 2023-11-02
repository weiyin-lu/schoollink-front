<template>
  <div>
    <el-tag>查询选项</el-tag>
    <div id="pad">
      <el-input style="width: 300px" v-model="idQuery" placeholder="工号"/>
      <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
      <el-button type="primary" @click="queryTeacher()">搜索</el-button>
      <el-button @click="clearQuery()">清空</el-button>
    </div>
  </div>
  <div>
    <el-tag>人员信息</el-tag>
    <el-table :data="queryTeacherList">
      <el-table-column prop="uniqueId" label="工号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
      <el-table-column prop="grade" label="管理班级" :formatter="gradeFormat"/>
      <el-table-column prop="contactPhone" label="联系方式（电话）"/>
      <el-table-column prop="contactEmail" label="联系方式（邮箱）"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-button type="danger" @click="removeTeacher(scope.row.uniqueId)">移除教师</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
// 引入已挂载的axios全局变量
const request = inject('$api')
// 数据列表
const teacherList = ref([])
const queryTeacherList = ref([])
const genderList = ref({})
const gradeList = ref({})
// 查询条件
const idQuery = ref("")
const nameQuery = ref("")

// 表格内格式化函数
const genderFormat = (row,column,cellValue) => {
  return genderList.value[cellValue]
}
const gradeFormat = (row,column,cellValue) => {
  return gradeList.value[cellValue]
}
// 教师信息查询
const queryTeacher = () => {
  if (nameQuery.value == "" && idQuery.value == "") {
    queryTeacherList.value = teacherList.value
  } else {
    queryTeacherList.value = []
    for (let i = 0; i < teacherList.value.length; i++) {
      if ((nameQuery.value == "" || teacherList.value[i].name.indexOf(nameQuery.value) != -1) &&
          ((idQuery.value == "" || teacherList.value[i].uniqueId.indexOf(idQuery.value) != -1))) {
        queryTeacherList.value.push(teacherList.value[i])
      }
    }
  }
}
// 清空查询条件
const clearQuery = () => {
  idQuery.value = ""
  nameQuery.value = ""
  queryTeacherList.value = teacherList.value
}
// 重置查询列表，从服务器重新获取一个完整列表
const resetQuery = () => {
  request.getTeachersList()
      .then(resp => {
        if (resp.data.code == 200) {
          queryTeacherList.value = resp.data.data
          teacherList.value = resp.data.data
        } else {
          ElMessage.error(resp.data.msg)
        }
      })
}
// 删除教师
const removeTeacher = (value) => {
  request.removeTeacher(value)
      .then(r => {
        ElMessage.success(r.data.msg)
        resetQuery()
      })
}
// 初始化
onMounted(() => {
  // 获取数据列表
  request.getTeachersList()
      .then(resp => {
        if(resp.data.code == 200) {
          queryTeacherList.value = resp.data.data
          teacherList.value = resp.data.data
        } else {
          ElMessage.error(resp.data.msg)
        }
      })
  // 获取格式化码表
  request.getCode("gender")
      .then(r => {
        genderList.value = r.data.data
      })
  // 获取格式化码表
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
</style>