<template>
  <div class="oom-tag-input" :class="[inputFocused && 'oom-is-focus']" @click.stop="inputCtrl?.focus()">
    <el-tag class="oom-tag-item" type="info" v-for="tag in tags" :key="tag" closable @close="delTag(tag)">
      {{ tag }}
    </el-tag>
    <input class="oom-input-ctrl" ref="inputCtrl" type="text" v-model="inputValue" @keydown.enter="addTag" @focus="inputFocus" @blur="inputBlur">
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import './style/tag-input.scss';

defineOptions({
  name: 'TagInput',
  inheritAttrs: true
});

const props = defineProps<{ modelValue?: Array<string> }>();
const emits = defineEmits<{ (e: 'update:model-value', data: any): void }>();

const tags = computed(() => Array.isArray(props.modelValue) ? props.modelValue : []);
const inputCtrl = ref<HTMLInputElement>();
const inputFocused = ref(false);
const inputValue = ref('');

const addTag = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  if (!inputValue.value) return;
  const value = (inputValue.value || '').trim();
  if (!tags.value.includes(value)) {
    emits('update:model-value', [...tags.value, value]);
  }
  inputValue.value = '';
};

const delTag = (tag: any) => {
  const index = tags.value.findIndex(x => x === tag);
  if (index === -1) return;
  emits('update:model-value', [...tags.value.slice(0, index), ...tags.value.slice(index + 1)]);
  inputCtrl.value?.focus();
};

const inputFocus = () => {
  inputFocused.value = true;
};

const inputBlur = (e: Event) => {
  inputFocused.value = false;
  addTag(e);
};
</script>