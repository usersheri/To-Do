import axios from "axios"

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASEURL}/api`
});

export default instance;