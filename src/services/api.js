import axios from "axios";

//const URL = "http://localhost:3001";
//const URL = "http://23.22.2.201:3002";
const URL = "http://servidorsuporte3d.ddns.net:3001";

const api = axios.create({
    baseURL: URL,
    auth: {
        username: "99coders",
        password: "112233"    
    }
});

export default api;