<template>
  <div>
    <el-tag>查询选项</el-tag>
    <div id="pad">
      <el-input style="width: 300px" v-model="idQuery" placeholder="编号"/>
      <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
  <div>
    <el-tag>人员信息</el-tag>
    <el-table :data="parentList">
      <el-table-column prop="uniqueId" label="编号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
      <el-table-column prop="contactPhone" label="联系方式（电话）"/>
      <el-table-column prop="contactEmail" label="联系方式（邮箱）"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default>
          <el-button>查看学生</el-button>
          <el-button type="danger">移除家长</el-button>
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
// 判断标识和查询条件
const idQuery = ref("")
const nameQuery = ref("")

// 表格内格式化函数
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}

// 此处有问题，返回的是Promise对象
// const parentFormat = async (row, column, cellValue) => {
//   let name = '';
//   await request.getParentByUnique(cellValue)
//       .then(r => {
//         if (r.data.code == 200 && r.data.data != null) {
//           name = r.data.data.parentName
//         } else {
//           name = "暂未分配"
//         }
//       })
//   return name;
// }

// 初始化
onMounted(() => {
  // 获取数据列表
  request.getParentsList()
      .then(resp => {
        if (resp.data.code == 200) {
          parentList.value = resp.data.data
        } else {
          ElMessage({
            message: resp.data.msg,
            type: "error"
          })
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