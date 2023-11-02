<template>
  <el-tag>当前班级: {{ gradeFormat(vuex.state.info.grade) }}</el-tag>

  <div id="pad">
    <el-input style="width: 300px" v-model="idQuery" placeholder="学号"/>
    <el-input style="width: 300px" v-model="nameQuery" placeholder="姓名"/>
    <el-button type="primary" @click="queryStudent()">搜索</el-button>
    <el-button type="primary" @click="clearQuery()">清空</el-button>
  </div>

  <el-table :data="queryStudentList">
    <el-table-column prop="uniqueId" label="学号"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="gender" label="性别" :formatter="genderFormat"/>
    <el-table-column label="家长信息">
      <template v-slot:default="scope">
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
        <el-button @click="pushNoticeBefore(scope.row)"
                   type="primary">
          发送通知
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" :show-close="false">
    <template #header="{close, titleId, titleClass}">
      <h4 :id="titleId">发送通知
        <el-button id="close"
                   type="danger"
                   @click="dialogVisible = false; noticeData.information = ''">
          关闭
        </el-button>
      </h4>
    </template>
    <div id="pad2">
      <el-tag>通知类型</el-tag>
      {{ noticeFormat(noticeData.noticeType) }}
      <el-tag>学号</el-tag>
      {{ noticeData.noticeTarget }}
    </div>
    <el-input v-model="noticeData.information" placeholder="输入内容..." type="textarea"/>
    <div>
      <el-button type="success" @click="pushNotice()">发送</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
// 全局变量
const request = inject("$api")
const vuex = useStore()
// 数据列表
const studentList = ref([])
const queryStudentList = ref([])
const gradeList = ref({})
const genderList = ref({})
const noticeList = ref({})
const parentInfo = ref({})
// 判断标识和查询条件
const dialogVisible = ref(false)
const idQuery = ref("")
const nameQuery = ref("")
// 请求携带参数
const noticeData = ref({
  information: "",
  noticeTarget: "",
  noticeType: ""
})

// 格式化函数
const gradeFormat = (value) => {
  return gradeList.value[value]
}
const genderFormat = (row, column, cellValue) => {
  return genderList.value[cellValue]
}
const noticeFormat = (value) => {
  return noticeList.value[value]
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
// 发送通知数据装填
const pushNoticeBefore = (value) => {
  dialogVisible.value = true;
  noticeData.value.noticeTarget = value.uniqueId;
  noticeData.value.noticeType = 'oth'
}

// 发送通知
const pushNotice = () => {
  request.addNotice(noticeData.value)
      .then(r => {
        if (r.data.code = 200) {
          ElMessage.success(r.data.msg)
          dialogVisible.value = false
        } else {
          ElMessage.error(r.data.msg)
        }
      })
}
// 查询学生信息
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
// 初始化
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
  // 获取格式化码表
  request.getCode("notice")
      .then(r => {
        noticeList.value = r.data.data
      })
  // 获取当前教师的班级所有学生
  request.getStudentListByGrade(vuex.state.info.grade)
      .then(r => {
        queryStudentList.value = r.data.data
        studentList.value = r.data.data
      })
})
</script>

<style scoped>
#close {
  float: right;
}

#pad {
  padding-bottom: 10px;
  padding-top: 10px;
}

#pad2 {
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>