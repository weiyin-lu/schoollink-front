<template>
  <el-table :data="teacherList">
    <el-table-column prop="teacherUniqueId" />
  </el-table>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const request = inject('$api')
const teacherList = ref([])

onMounted(() => {
  request.getTeachersList()
      .then(resp => {
        console.log(resp.data)
        if(resp.data.code == 200) {
          teacherList.value = resp.data.data
        } else {
          ElMessage({
            message: resp.data.msg,
            type: "error"
          })
        }
      })
})
</script>

<style scoped>

</style>