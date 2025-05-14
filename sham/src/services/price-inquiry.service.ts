import axios from "axios";
import { config } from "./config.service";

export const addPriceInquiry = (payload: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/inquiry/add`, payload, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
export const getActiveRequests = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/price-inquiry/getActiveRequests`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
export const markInquiryAsRead = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/price-inquiry/read`,
    { id: id },
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
export const getInquiryByKey = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/price-inquiry/getByKey`,
    { id: id },
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
export const getExpiredRequests = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/price-inquiry/getExpiredRequests`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
export const getAllActiveRequests = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/price-inquiry/getAllActiveRequests`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

export const getAllExpiredRequests = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/price-inquiry/getAllExpiredRequests`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
