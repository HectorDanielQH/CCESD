import axios from "axios";

const instancia = axios.create({
    baseURL: 'https://backend.infokolla.space/api',
    withCredentials:true
})

export default instancia;