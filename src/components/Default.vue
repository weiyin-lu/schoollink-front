<template>
  <div>
    <el-tag>个人信息</el-tag>
    <el-card>
      <template #header>
        欢迎你，用户
      </template>
      {{ getInfo }}
    </el-card>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";

const request = inject('$api')
// 数据列表
const getInfo = ref({})

onMounted(() => {
  request.getInfo()
      .then(r => {
        getInfo.value = r.data.data
      })
})
</script>

<style scoped>

</style>