<template>
  <el-tag>字典列表</el-tag>
  <el-button>新增字典</el-button>
  <el-divider />
  <div>
    <el-row gutter="20">
      <el-col :span="6" v-for="item in dicKeyList">
        <el-card>
          <template #header>
            {{ item }}
          </template>
          <el-button>查看详情</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {inject, onMounted, ref} from "vue";

const request = inject('$api')

const dicKeyList = ref()

onMounted(() => {
  request.getKey()
      .then(r => {
        dicKeyList.value = r.data.data
        console.log(dicKeyList.value)
      })
})
</script>

<style scoped>

</style>