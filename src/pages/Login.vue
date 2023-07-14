<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

const formLabelAlign = reactive({
  name: "",
  password: "",
  code: "",
});

const codeUrl = ref<string>("/api/user/code");
const resetCode = () => {
  codeUrl.value = codeUrl.value + "?" + Math.random();
};

const onSubmit = async () => {
  await fetch("/api/user/create", {
    method: "POST",
    body: JSON.stringify(formLabelAlign),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      ElMessage({ message: res.message, type: "success" });
    });
};
</script>

<template>
  <div class="wrap">
    <el-form
      label-width="100px"
      :model="formLabelAlign"
      class="demo-form-inline"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item label="验证码">
        <div style="display: flex">
          <el-input v-model="formLabelAlign.code" />
          <img @click="resetCode" :src="codeUrl" alt="" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
