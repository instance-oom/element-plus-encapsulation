<script setup lang="ts">
import { ref } from 'vue';
// import { OOMDateRangePicker } from '@element-plus-encapsulation/components';

const dates = ref<any>([]);
const tags = ref<any>([]);
</script>

<template>
  <!-- <el-button>Test</el-button> -->
  <!-- <OOMDateRangePicker /> -->
  <oom-date-range-picker>
    <template #prefix>
      <span>Test</span>
      <el-divider direction="vertical"></el-divider>
    </template>
  </oom-date-range-picker>

  <oom-tag-input v-model="tags" />
</template>
