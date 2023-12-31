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
          <el-button @click="changeGradeBefore(scope.row)" type="success">编入班级</el-button>
          <el-popconfirm title="移除此数据？"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         cancel-button-type="danger"
                         @confirm="removeTeacher(scope.row.uniqueId)">
            <template #reference>
              <el-button type="danger">移除教师</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="450px">
      <template #title>
        <h3>编入班级</h3>
      </template>
      选择班级：
      <el-select v-model="changeGradeData.grade" filterable placeholder="输入班级编号">
        <el-option v-for="item in Object.keys(gradeList)"
                   :key="item"
                   :value="item">
          {{ gradeList[item] + "(" + item + ")" }}
        </el-option>
      </el-select>
      <template #footer>
        <el-button @click="changeGrade()">确定</el-button>
      </template>
    </el-dialog>
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
const changeGradeData = ref({
  id: "",
  grade: ""
})
// 条件标识和查询条件
const idQuery = ref("")
const nameQuery = ref("")
const dialogVisible = ref(false)

// 表格内格式化函数
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}
const gradeFormat = (row, column, cellValue) => {
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
// 分配班级数据装填
const changeGradeBefore = (value) => {
  dialogVisible.value = true;
  changeGradeData.value.id = value.uniqueId
  changeGradeData.value.grade = value.grade
}
// 分配班级
const changeGrade = () => {
  request.addGradeForTeacher(changeGradeData.value.id, changeGradeData.value.grade)
      .then(r => {
        ElMessage.success(r.data.msg)
        dialogVisible.value = false;
        resetQuery()
      })
}
// 初始化
onMounted(() => {
  // 获取数据列表
  request.getTeachersList()
      .then(resp => {
        if (resp.data.code == 200) {
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