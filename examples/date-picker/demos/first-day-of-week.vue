<template>
  <div class="tdesign-demo-block-column">
    <t-radio-group v-model="startWeek" variant="default-filled">
      <t-radio-button v-for="i in list" :key="i" :value="i">{{ i }}</t-radio-button>
    </t-radio-group>

    <t-date-picker :first-day-of-week="startWeek" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const startWeek = ref(1);
const list = ref([1, 2, 3, 4, 5, 6, 7]);
</script>
