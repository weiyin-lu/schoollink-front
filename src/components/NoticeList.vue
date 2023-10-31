<template>
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
          {{ item.information.substring(0, 20) + '......' }}
        </template>
        <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:我
        </span>
        <span id="button">
          <el-button @click="dialogVisible=true">查看详情</el-button>
        </span>
      </el-card>
    </el-col>
    <el-col :span="12" v-for="item in toGradeNoticeList">
      <el-card>
        <template #header>
          <div id="title">
            {{ noticeTypeList[item.noticeType] }}
          </div>
          {{ item.information.substring(0, 20) + '......' }}
        </template>
        <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:班级
        </span>
        <span id="button">
          <el-button @click="dialogVisible=true">查看详情</el-button>
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
            {{ item.information.substring(0, 20) + '......' }}
          </template>
          <span id="comment">
          创建时间:{{ item.createDt }} /
          发布:{{ item.createdId }} /
          通知目标:{{ item.noticeTarget }}
        </span>
          <span id="button">
          <el-button @click="dialogVisible=true">查看详情</el-button>
        </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
// 全局变量
const request = inject('$api')
const vuex = useStore();
// 数据列表
const ownNoticeList = ref([])
const toPersonNoticeList = ref([])
const toGradeNoticeList = ref([])
const noticeTypeList = ref({})
// 判断标识和查询条件
const dialogVisible = ref(false)
// 页面初始化
onMounted(() => {
  request.showNoticeByCreator()
      .then(r => {
        ownNoticeList.value = r.data.data
      })
  request.showNoticeByCondition(vuex.state.info.uniqueId)
      .then(r => {
        toPersonNoticeList.value = r.data.data
      })
  request.showNoticeByCondition(vuex.state.info.grade)
      .then(r => {
        toGradeNoticeList.value = r.data.data
      })
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
}
</style>