<template>
  <div class="t-demo-message">
    <t-message v-if="isShowMsg" :close-btn="true" @close-btn-click="isShowMsg = false">
      点击关闭按钮触发事件 close-btn-click
    </t-message>

    <t-message v-if="closableMsg" close-btn="关闭" @close-btn-click="closableMsg = false">
      自定义关闭按钮（文字）
    </t-message>

    <t-message v-if="closableMsg1" :close-btn="closeBtn"> 自定义关闭按钮（函数） </t-message>

    <t-message v-if="closableMsg2">
      自定义关闭按钮（插槽）
      <template #closeBtn>
        <div class="t-message-close" @click="closableMsg2 = false">
          <b>x</b>
        </div>
      </template>
    </t-message>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const isShowMsg = ref(true);
const closableMsg = ref(true);
const closableMsg1 = ref(true);
const closableMsg2 = ref(true);

const closeBtn = () => {
  return (
    <div
      class="t-message-close"
      onClick={() => {
        closableMsg1.value = false;
      }}
    >
      <b>x</b>
    </div>
  );
};
</script>
<style lang="less" scoped>
.t-demo-message {
  .t-message,
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
