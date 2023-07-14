<script setup lang="ts"></script>

<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link class="page" to="/boss">去后台页面</router-link>
      <router-link class="page" to="/login">去登录页面</router-link>
      <router-link class="page" to="/upload">去上传文件页面</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.page {
  display: block;
  margin-bottom: 20px;
}
</style>
