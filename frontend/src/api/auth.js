import axios from "./axios.js";

export const registrarRequest = (user) => axios.post(`/register`,user);

export const loginRequest = (user) => axios.post(`/login`,user);

export const logoutRequest = (user) => axios.post(`/logout`,user);

export const profileRequest = (user) => axios.get(`/profile/`+user);

export const verifyTokenRequest=()=>axios.get('/verify');