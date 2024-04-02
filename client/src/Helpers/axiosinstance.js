import axios from "axios";

const BASE_URL = "http://localhost:4010/api/v1";

const axiosInsatnce = axios.create();

axiosInsatnce.defaults.baseURL = BASE_URL;
axiosInsatnce.defaults.withCredentials = true;

export default axiosInsatnce;