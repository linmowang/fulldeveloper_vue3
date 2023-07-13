<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, reactive } from "vue";
import { addUser, getList, updateUser, deleteUser, addTags } from "./server";

const total = ref(0);
const search = reactive({
  keyword: "",
  page: 1,
  pageSize: 10,
});

const form = reactive({
  name: "",
  password: "",
  id: 0,
});

// 清空数据
const resetForm = reactive({ ...form });

const tableData = ref([]);

const init = async () => {
  const list = await getList(search);
  tableData.value = list?.data ?? [];
  total.value = list?.total ?? 0;
};
init();

const changePage = (page: number) => {
  search.page = page;
  init();
};

const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
  // from表单初始化
  Object.assign(form, resetForm);
};

const edit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(form, row);
};

const deleteRow = async (row: any) => {
  await deleteUser(row);
  init();
};

const close = () => {
  dialogVisible.value = false;
};

const save = async () => {
  if (form.id) {
    await updateUser(form);
  } else {
    await addUser(form);
  }
  init();
  dialogVisible.value = false;
};

// tags
const row = ref<{
  id?: number;
  name?: number;
  password?: number;
  createTime?: Date;
  tags?: any;
}>({});

const resetRow = ref({ ...row });

const tagDialogVisiable = ref<boolean>(false);
const showTagDialog = (rowtemp: any) => {
  tagDialogVisiable.value = true;
  row.value = rowtemp;
  tags.value = row.value.tags.map((item: any) => item.tag);
};

const tags = ref<string[]>([]);
const closeTagDialog = () => {
  tagDialogVisiable.value = false;
  Object.assign(row, resetRow);
};
const addTagConfirm = async () => {
  const res = await addTags({
    tags: tags.value,
    userId: row.value.id,
  });
  console.log(res);
  closeTagDialog();
  tags.value = [];
  init();
};
</script>

<template>
  <div class="wrap">
    <div>
      <el-input v-model="search.keyword" style="width: 300px"></el-input>
      <el-button @click="init" style="margin-left: 10px">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left: 10px"
        >添加</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 40px">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="password" label="password" />
      <el-table-column label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteRow(scope.row)"
            >删除</el-button
          >

          <el-button
            link
            type="primary"
            size="small"
            @click="showTagDialog(scope.row)"
            >添加tags</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      @current-change="changePage"
      layout="prev, pager, next"
      :total="total"
      v-show="total > 0"
    />

    <el-dialog v-model="dialogVisible" title="弹窗">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">关闭</el-button>
          <el-button type="primary" @click="save"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="tagDialogVisiable" title="tags">
      <el-select style="width: 50%" v-model="tags" multiple>
        <el-option label="tag1" value="tag1" />
        <el-option label="tag2" value="tag2" />
        <el-option label="tag3" value="tag3" />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeTagDialog">Cancel</el-button>
          <el-button type="primary" @click="addTagConfirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
