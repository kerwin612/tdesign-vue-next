<template>
  <div class="tdesign-demo-block-row">
    <t-select
      v-model="value1"
      creatable
      filterable
      placeholder="单选支持自定义创建"
      :options="options"
      @create="createOptions"
    />
    <t-select
      v-model="value2"
      creatable
      filterable
      multiple
      placeholder="多选支持自定义创建"
      :options="options"
      @create="createOptions"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]);

const createOptions = (val) => {
  options.value.push({
    label: `选项${val}`,
    value: val,
  });
  console.log('create option:', val);
};
</script>
