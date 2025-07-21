import axios from "axios";
import { config } from "./config.service";
export const loginService = (mobile: string, otpCode: string) => {
  return axios.post(`${config.BASE_URL}/auth/login`, {
    mobile: mobile,
    otpCode: otpCode,
  });
};
export const sendOtp = (mobile: string) => {
  return axios.post(`${config.BASE_URL}/auth/sendOtp`, {
    mobile: mobile,
  });
};
export const getUserInfo = () => {
  const token = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/auth/getUserInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
