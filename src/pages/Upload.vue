<script setup lang="ts">
const useFetch = async (url: string) => {
  const res = await fetch(url).then((res) => res.arrayBuffer());
  console.log(res);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([res], {
      // type: 'image/png'
    })
  );
  a.download = "xiaoman.zip";
  a.click();
};

const downloadFile = () => {
  useFetch("http://localhost:3000/upload/stream");
};
</script>

<template>
  <div class="wrap">
    <el-button @click="downloadFile">点击下载</el-button>
  </div>
</template>

<style scoped></style>
