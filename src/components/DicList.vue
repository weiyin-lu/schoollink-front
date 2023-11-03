<template>
  <el-button v-if="vuex.state.role[0] == '1'" type="primary">新增字典</el-button>
  <div id="pad">
    <el-tag>字典列表</el-tag>
  </div>
  <div>
    <el-row gutter="20">
      <el-col :span="6" v-for="item in dicKeyList">
        <el-card>
          <template #header>
            {{ item }}
          </template>
          <el-button @click="getCodeByType(item)">查看详情</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible">
    <template #title>
      <h3>字典详情</h3>
    </template>
    <el-row gutter="10px">
      <el-col :span="8">
        <el-tag>编码id</el-tag>
      </el-col>
      <el-col :span="8">
        <el-tag>编码含义</el-tag>
      </el-col>
      <el-col :span="8">
        <el-tag>操作</el-tag>
      </el-col>
    </el-row>
    <el-row gutter="10px" v-for="(value,key) in dicList">
      <el-col id="tab" :span="8">{{ key }}</el-col>
      <el-col id="tab" :span="8">{{ value }}</el-col>
      <el-col id="tab" :span="8">
        <el-button size="small">修改</el-button>
      </el-col>
    </el-row>
    <template #footer>
      <el-button type="primary">添加</el-button>
    </template>
  </el-dialog>
</template>

<script setup>

import {inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
// 全局组件变量
const request = inject('$api')
const vuex = useStore()
// 数据列表
const dicKeyList = ref()
const dicList = ref({})
// 判断标识和查询条件
const dialogVisible = ref(false)

// 获取对应字典编码的键值列表
const getCodeByType = (value) => {
  dialogVisible.value = true;
  request.getCode(value)
      .then(r => {
        dicList.value = r.data.data
      })
}
// 初始化
onMounted(() => {
  // 获取字典编码列表
  request.getKey()
      .then(r => {
        dicKeyList.value = r.data.data
      })
})
</script>

<style scoped>
#pad {
  padding-bottom: 10px;
  padding-top: 10px;
}

#tab {
  font-size: 15px;
  padding-top: 15px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: #f47983;
}
</style>