<template>
  <div class="oom-date-range-container" :style="{ '--el-input-prefix-width': inputPrefixWidth + 'px' }">
    <el-input ref="input" readonly :class="{ 'active': focused }">
      <template #prefix>
        <slot name="prefix"></slot>
      </template>
    </el-input>
    <div class="datepickers">
      <div class="date-picker">
        <el-date-picker v-model="fromDate" type="date" :format="props.format" :value-format="props.valueFormat"
          @focus="datePickerVisibility.from = true" @blur="datePickerVisibility.from = false" style="width: 100%;" />
      </div>
      <div style="flex: initial;"> ~ </div>
      <div class="date-picker">
        <el-date-picker v-model="toDate" type="date" :format="props.format" :value-format="props.valueFormat"
          @focus="datePickerVisibility.to = true" @blur="datePickerVisibility.to = false" style="width: 100%;" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { ElInput, ElDatePicker, dayjs } from 'element-plus';
import './style/date-range-picker.scss';

defineOptions({
  name: 'DateRangePicker',
  inheritAttrs: true
});

const props = withDefaults(defineProps<{ modelValue: Array<any>, format?: string, valueFormat?: string }>(), {
  format: 'YYYY/MM/DD',
  valueFormat: 'x'
});
const emits = defineEmits<{ (e: 'update:model-value', data: any): void }>();
const input = ref<any>(), inputPrefixWidth = ref(0);

const fromDate = computed({
  get() { return Array.isArray(props.modelValue) ? props.modelValue[0] : undefined },
  set(newValue: any) { emits('update:model-value', [newValue, toDate.value]) }
});
const toDate = computed({
  get() { return Array.isArray(props.modelValue) ? props.modelValue[1] : undefined },
  set(newValue: any) {
    let value = newValue && dayjs(newValue).add(1, 'day').add(-1, 'second').format(props.valueFormat);
    if (value && props.valueFormat === 'x') value = +value;
    emits('update:model-value', [fromDate.value, value]);
  }
});

const datePickerVisibility = reactive({ from: false, to: false });
const focused = computed(() => datePickerVisibility.from || datePickerVisibility.to);

watch(() => input.value, () => {
  const prefixElement = input.value?.ref?.parentElement?.querySelector('.el-input__prefix') as HTMLElement;
  inputPrefixWidth.value = prefixElement ? prefixElement.offsetWidth : 0;
});
</script>