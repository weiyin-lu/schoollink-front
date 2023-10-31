<template>
  <el-tag>字典管理</el-tag>
  <el-divider />
  <el-button>新增字典</el-button>
  <el-divider />
  <div>
    <el-row gutter="20">
      <el-col :span="6" v-for="item in dicKeyList">
        <el-card>
          <template #header>
            {{ item }}
          </template>
          <el-button @click="dialogVisible=true; getCodeByType(item)">查看详情</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" >
    <template #header>
      字典详情
    </template>
    <el-row gutter="10px">
      <el-col :span="8"><el-tag>编码id</el-tag></el-col>
      <el-col :span="8"><el-tag>编码含义</el-tag></el-col>
      <el-col :span="8"><el-tag>操作</el-tag></el-col>
    </el-row>
    <el-row gutter="10px" v-for="(value,key,index) in dicList">
        <el-col id="tab" :span="8">{{key}}</el-col>
        <el-col id="tab" :span="8">{{value}}</el-col>
        <el-col id="tab" :span="8"><el-button size="small">修改</el-button></el-col>
    </el-row>
    <el-button type="primary">添加</el-button>
  </el-dialog>
</template>

<script setup>

import {inject, onMounted, ref} from "vue";
// 全局组件变量
const request = inject('$api')
// 数据列表
const dicKeyList = ref()
const dicList = ref({})
// 判断标识和查询条件
const dialogVisible = ref(false)

const getCodeByType = (value) => {
  request.getCode(value)
      .then(r => {
        dicList.value = r.data.data
      })
}

onMounted(() => {
  request.getKey()
      .then(r => {
        dicKeyList.value = r.data.data
      })
})
</script>

<style scoped>
#tab {
  font-size: 15px;
  padding-top: 15px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: #f47983;
}
</style>