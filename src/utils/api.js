import axios from "axios";

const api = axios.create({
    baseURL:"http://10.122.228.95:3000/api/auth",
    // withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

export default api;