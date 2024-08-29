import axios from "axios";

const userApi = axios.create({
  baseURL: "https://reqres.in/api/",
});

export default userApi;
