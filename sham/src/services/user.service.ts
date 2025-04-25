import axios from "axios";
import { config } from "./config.service";

export const addUser = (form: any) => {
  return axios.post(`${config.BASE_URL}/user/add`, form);
};
export const getEditUserInfo = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/user/edit`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const getEditUserMobile = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/user/edit/mobile`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const editUserInfo = (params: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/user/edit`, params, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const isUserRegistered = (mobile: string) => {
  return axios.post(`${config.BASE_URL}/user/isRegistered`, { mobile: mobile });
};
export const getUserCoords = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/user/getLocation`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
