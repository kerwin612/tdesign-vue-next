<template>
  <t-head-menu theme="dark" value="item1">
    <template #logo>
      <img width="136" class="t-menu__logo--center" src="https://www.tencent.com/img/index/menu_logo.png" alt="logo" />
    </template>
    <t-menu-item value="item1"> 已选内容 </t-menu-item>
    <t-menu-item value="item2"> 菜单内容一 </t-menu-item>
    <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
    <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
    <template #operations>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="mail" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
      <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="ellipsis" /></a>
    </template>
  </t-head-menu>
</template>
