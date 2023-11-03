<template>
  <el-button v-if="vuex.state.role[0] != '3'" type="primary" @click="dialogVisibleAdd = true">发布通知
  </el-button>
  <div id="pad">
    <el-tag>我收到的</el-tag>
  </div>
  <el-row gutter="20">
    <el-col :span="12" v-for="item in toPersonNoticeList">
      <el-card>
        <template #header>
          <div id="title">
            {{ noticeTypeList[item.noticeType] }}
          </div>
          {{ item.information.substring(0, 5) + '......' }}
        </template>
        <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:我
        </span>
        <span id="button">
          <el-button @click="noticeDetailBefore(item)">查看详情</el-button>
        </span>
      </el-card>
    </el-col>
    <el-col :span="12" v-for="item in toGradeNoticeList">
      <el-card>
        <template #header>
          <div id="title">
            {{ noticeTypeList[item.noticeType] }}
          </div>
          {{ item.information.substring(0, 5) + '......' }}
        </template>
        <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:班级
        </span>
        <span id="button">
          <el-button @click="noticeDetailBefore(item)">查看详情</el-button>
        </span>
      </el-card>
    </el-col>
  </el-row>
  <div v-if="vuex.state.role[0] != '3'">
    <el-divider/>
    <div id="pad">
      <el-tag>我发布的</el-tag>
    </div>
    <el-row gutter="20">
      <el-col :span="12" v-for="item in ownNoticeList">
        <el-card>
          <template #header>
            <div id="title">
              {{ noticeTypeList[item.noticeType] }}
            </div>
            {{ item.information.substring(0, 5) + '......' }}
          </template>
          <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:{{ item.noticeTarget }}
          </span>
          <span id="button">
          <el-button @click="noticeDetailBefore(item)">查看详情</el-button>
          </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisibleDetail">
    <template #title>
      <h3>通知详情</h3>
    </template>
    {{ noticeDetail.information }}
    <template #footer>
      <div id="comment">
        {{ noticeTypeList[noticeDetail.noticeType] }} /
        创建时间:{{ noticeDetail.createDt }} /
        发布:{{ noticeDetail.createdId }} /
        通知目标:班级
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisibleAdd">
    <template #title>
      <h3>发送通知</h3>
    </template>
    <el-row>
      <el-tag>通知类型</el-tag>
      <el-col :span="6">
        <el-select v-model="noticeData.noticeType">
          <el-option v-for="item in Object.keys(noticeTypeList)"
                     :key="item"
                     :value="item"
                     :label="noticeTypeList[item]"/>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-tag>通知目标</el-tag>
      <el-col v-if="vuex.state.role[0] == 'admin'||vuex.state.role[0] == '1'" :span="6">
        <el-radio-group v-model="NoticeTarget">
          <el-radio label="1" @change="changeNoticeTarget()">班级</el-radio>
          <el-radio label="2" @change="changeNoticeTarget()">个人</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="6" v-if="noticeTargetVisible || vuex.state.role[0] == '2'">
        <el-input v-model="noticeData.noticeTarget" placeholder="输入通知对象工号/学号"/>
      </el-col>
    </el-row>
    <el-row>
      <el-input type="textarea" v-model="noticeData.information" placeholder="输入通知内容"/>
    </el-row>
    <template #footer>
      <el-button type="primary" @click="pushNotice()">发送通知</el-button>
    </template>
  </el-dialog>

</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
// 全局变量
const request = inject('$api')
const vuex = useStore();
// 数据列表
const ownNoticeList = ref([])
const toPersonNoticeList = ref([])
const toGradeNoticeList = ref([])
const noticeTypeList = ref({})
const noticeDetail = ref({})
const noticeData = ref({
  information: "",
  noticeTarget: "",
  noticeType: ""
})
// 判断标识和查询条件
const dialogVisibleDetail = ref(false)
const dialogVisibleAdd = ref(false)
const NoticeTarget = ref("")
const noticeTargetVisible = ref(false)

// 通知详情数据装填
const noticeDetailBefore = (value) => {
  dialogVisibleDetail.value = true
  noticeDetail.value = value
}
// 切换工号/学号
const changeNoticeTarget = () => {
  switch (NoticeTarget.value) {
    case "1" :
      noticeTargetVisible.value = false
      noticeData.value.noticeTarget = vuex.state.info.grade;
      break;
    case "2" :
      noticeTargetVisible.value = true
      noticeData.value.noticeTarget = ""
      break;
  }
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
  dialogVisibleAdd.value = false
}

// 初始化
onMounted(() => {
  // 获取当前账户发送的通知
  request.showNoticeByCreator()
      .then(r => {
        ownNoticeList.value = r.data.data
      })
  // 获取当前账户接收到的通知
  request.showNoticeByCondition(vuex.state.info.uniqueId)
      .then(r => {
        toPersonNoticeList.value = r.data.data
      })
  // 获取当前账户所在班级的通知
  request.showNoticeByCondition(vuex.state.info.grade)
      .then(r => {
        toGradeNoticeList.value = r.data.data
      })
  // 格式化码表
  request.getCode("notice")
      .then(r => {
        noticeTypeList.value = r.data.data
      })
})
</script>

<style scoped>
#title {
  font-size: 25px;
}

#button {
  float: right;
  padding-bottom: 10px;
}

#comment {
  color: darkgray;
  font-size: 13px;
}

#pad {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>