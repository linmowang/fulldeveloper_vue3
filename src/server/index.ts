import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const addUser = (data: any) =>
  axios.post("/user", data).then((res) => res.data);

export const getList = (data: any) =>
  axios.get("/user", { params: data }).then((res) => res.data);

export const updateUser = (data: any) =>
  axios.patch(`/user/${data.id}`, data).then((res) => res.data);

export const deleteUser = (data: any) =>
  axios.delete(`/user/${data.id}`).then((res) => res.data);

export const addTags = (data: any) =>
  axios.post("/user/add/tags", data).then((res) => res.data);

// 登录相关
// axios.defaults.withCredentials = true;
// 这个开启才能带上cookie
export const createUser = (data: any) =>
  axios.post("/user/create", data).then((res) => res.data);
