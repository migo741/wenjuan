<template>
  <div class="test pt-20 pb-20 pl-20 pr-20">
    <h1 class="text-center font-weight-100">问卷调查系统test</h1>
    <div class="mb-15">
      <el-button type="primary" :icon="Plus">创建问卷</el-button>
      <el-button type="success" :icon="Compass">组价市场</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column fixed prop="createDate" label="创建时间" width="150" />
      <el-table-column prop="title" label="问卷标题" />
      <el-table-column
        prop="surveyCount"
        label="题目数"
        width="150"
        align="center"
      />
      <el-table-column
        prop="updateDate"
        label="最近更新时间"
        width="150"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template>
          <el-button link type="primary" size="small">查看</el-button>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { Plus, Compass } from '@element-plus/icons-vue'
import { ref } from 'vue'

const tableData = ref([])
</script>

<style scoped></style>
