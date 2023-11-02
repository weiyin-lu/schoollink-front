<template>
  <el-tag>查询选项</el-tag>
  <div id="pad">
    <el-select style="width: 300px" v-model="gradeQuery" filterable placeholder="班级">
      <el-option v-for="item in Object.keys(gradeList)"
                 :value="item"
                 :key="item"
                 :label="gradeList[item]"/>
    </el-select>
    <el-button type="primary" @click="queryStudentByGrade()">搜索</el-button>
    <el-button @click="clearQueryForGrade()">清空</el-button>
  </div>
  <div id="pad">
    <el-input style="width: 300px" v-model="idQuery" placeholder="学号"/>
    <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
    <el-button type="primary" @click="queryStudent()">搜索</el-button>
    <el-button @click="clearQuery()">清空</el-button>
  </div>
  <div>
    <el-tag>人员信息</el-tag>
    <el-table :data="queryStudentList">
      <el-table-column prop="uniqueId" label="学号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
      <el-table-column prop="grade" label="所在班级" :formatter="gradeFormat"/>
      <el-table-column label="家长信息">
        <template #default="scope">
          <el-popover trigger="hover" placement="right" width="200px">
            <template #reference>
              <el-button @mouseover="getParentInfo(scope.row.parents)">家长信息</el-button>
            </template>
            <el-tag>家长</el-tag>
            {{ parentInfo.name }}
            <br/>
            <el-tag>联系电话</el-tag>
            {{ parentInfo.contactPhone }}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="contactPhone" label="联系方式（电话）" :formatter="nullFormat"/>
      <el-table-column prop="contactEmail" label="联系方式（邮箱）" :formatter="nullFormat"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-button type="success" @click="changeParentBefore(scope.row)">分配家长</el-button>
          <el-popconfirm title="移除此数据？"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         cancel-button-type="danger"
                         @confirm="removeStudent(scope.row.uniqueId)">
            <template #reference>
              <el-button type="danger">移除学生</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="450px">
      <template #title>
        <h3>分配家长</h3>
      </template>
      <el-select v-model="parentData.parent" filterable placeholder="输入家长编号">
        <el-option v-for="item in parentList"
                   :key="item.uniqueId"
                   :value="item.uniqueId">
          {{ item.name }}
        </el-option>
      </el-select>
      <template #footer>
        <el-button @click="changeParent()">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
// 全局变量
const request = inject('$api')
// 数据列表
const studentList = ref([])
const queryStudentList = ref([])
const genderList = ref({})
const gradeList = ref({})
const parentInfo = ref({})
const parentList = ref([])
const parentData = ref({
  id: "",
  parent: ""
})
// 查询条件和判断标识
const idQuery = ref("")
const nameQuery = ref("")
const gradeQuery = ref("")
const dialogVisible = ref(false)

// 表格内格式化函数
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}
const gradeFormat = (row, column, cellValue) => {
  return gradeList.value[cellValue]
}
const nullFormat = (row, column, cellValue) => {
  if (cellValue == null) {
    return '暂无'
  } else {
    return cellValue
  }
}

// 获取学生对应的家长信息
const getParentInfo = (value) => {
  request.getParentByUnique(value)
      .then(r => {
        if (r.data.data != null) {
          parentInfo.value = r.data.data
        } else {
          parentInfo.value = {
            name: "暂无",
            contactPhone: "暂无"
          }
        }
      })
}
// 学生查询
const queryStudent = () => {
  if (nameQuery.value == "" && idQuery.value == "") {
    queryStudentList.value = studentList.value
  } else {
    queryStudentList.value = []
    for (let i = 0; i < studentList.value.length; i++) {
      if ((nameQuery.value == "" || studentList.value[i].name.indexOf(nameQuery.value) != -1) &&
          ((idQuery.value == "" || studentList.value[i].uniqueId.indexOf(idQuery.value) != -1))) {
        queryStudentList.value.push(studentList.value[i])
      }
    }
  }
}
// 清空查询条件
const clearQuery = () => {
  idQuery.value = ""
  nameQuery.value = ""
  queryStudentList.value = studentList.value
}
// 查询特定班级的学生，从服务器获取
const queryStudentByGrade = () => {
  request.getStudentListByGrade(gradeQuery.value)
      .then(r => {
        console.log(r.data.data)
        queryStudentList.value = r.data.data
        studentList.value = r.data.data
      })
}
// 重置查询列表，从服务器重新获得一个完整列表
const resetQuery = () => {
  request.getStudentList()
      .then(resp => {
        if (resp.data.code == 200) {
          queryStudentList.value = resp.data.data
          studentList.value = resp.data.data
        } else {
          ElMessage.error(resp.data.msg)
        }
      })
}
// 清空班级查询
const clearQueryForGrade = () => {
  gradeQuery.value = ""
  resetQuery()
}
// 修改家长数据装填
const changeParentBefore = (value) => {
  dialogVisible.value = true
  request.getParentsList()
      .then(r => {
        parentList.value = r.data.data;
        parentData.value.id = value.uniqueId
        parentData.value.parent = value.parents
      })
}
// 修改家长
const changeParent = () => {
  request.setParent(parentData.value.id, parentData.value.parent)
      .then(r => {
        ElMessage.success(r.data.msg)
        dialogVisible.value = false
        resetQuery()
      })
}
// 删除学生
const removeStudent = (value) => {
  request.removeStudent(value)
      .then(r => {
        ElMessage.success(r.data.msg)
        resetQuery()
      })
}
// 初始化
onMounted(() => {
  // 获取数据列表
  request.getStudentList()
      .then(resp => {
        if (resp.data.code == 200) {
          queryStudentList.value = resp.data.data
          studentList.value = resp.data.data
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