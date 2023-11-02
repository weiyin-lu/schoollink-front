<template>
  <div>
    <el-tag>查询选项</el-tag>
    <div id="pad">
      <el-input style="width: 300px" v-model="idQuery" placeholder="编号"/>
      <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
      <el-button type="primary" @click="queryParent()">搜索</el-button>
      <el-button @click="clearQuery()">清空</el-button>
    </div>
  </div>
  <div>
    <el-tag>人员信息</el-tag>
    <el-table :data="queryParentList">
      <el-table-column prop="uniqueId" label="编号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
      <el-table-column prop="contactPhone" label="联系方式（电话）"/>
      <el-table-column prop="contactEmail" label="联系方式（邮箱）"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-popover trigger="hover" placement="left" width="200px">
            <template #reference>
              <el-button @mouseover="showStudent(scope.row.uniqueId)">查看学生</el-button>
            </template>
            <div v-if="studentInfo.length > 0">
              <el-table :data="studentInfo">
                <el-table-column label="姓名" prop="name"/>
                <el-table-column label="班级" prop="grade" :formatter="gradeFormat"/>
              </el-table>
            </div>
            <div v-else>
              暂未绑定
            </div>
          </el-popover>
          <el-popconfirm title="移除此数据？"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         cancel-button-type="danger"
                         @confirm="removeParent(scope.row.uniqueId)">
            <template #reference>
              <el-button type="danger">移除家长</el-button>
            </template>
          </el-popconfirm>
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
const parentList = ref([])
const genderList = ref({})
const gradeList = ref({})
const queryParentList = ref([])
const studentInfo = ref([])
// 判断标识和查询条件
const idQuery = ref("")
const nameQuery = ref("")

// 表格内格式化函数
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}
const gradeFormat = (row, column, cellValue) => {
  return gradeList.value[cellValue]
}

// 数据获取
const queryParent = () => {
  if (nameQuery.value == "" && idQuery.value == "") {
    queryParentList.value = parentList.value
  } else {
    queryParentList.value = []
    for (let i = 0; i < parentList.value.length; i++) {
      if ((nameQuery.value == "" || parentList.value[i].name.indexOf(nameQuery.value) != -1) &&
          ((idQuery.value == "" || parentList.value[i].uniqueId.indexOf(idQuery.value) != -1))) {
        queryParentList.value.push(parentList.value[i])
      }
    }
  }
}
const clearQuery = () => {
  idQuery.value = ""
  nameQuery.value = ""
  queryParentList.value = parentList.value
}
const resetQuery = () => {
  request.getParentsList()
      .then(resp => {
        if (resp.data.code == 200) {
          queryParentList.value = resp.data.data
          parentList.value = resp.data.data
        } else {
          ElMessage.error(resp.data.msg)
        }
      })
}
const showStudent = (value) => {
  request.getOwnStudent(value)
      .then(r => {
        studentInfo.value = r.data.data
      })
}
const removeParent = (value) => {
  request.removeParent(value)
      .then(r => {
        ElMessage.success(r.data.msg)
        resetQuery()
      })
}
// 初始化
onMounted(() => {
  // 获取数据列表
  request.getParentsList()
      .then(resp => {
        if (resp.data.code == 200) {
          queryParentList.value = resp.data.data
          parentList.value = resp.data.data
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