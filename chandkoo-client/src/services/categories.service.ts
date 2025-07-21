import axios from "axios";
import { config } from "./config.service";
export const getAllCategories = () => {
  return axios.get(`${config.BASE_URL}/category/getAll`);
};

export const getAllAdminCategories = () => {
  return axios.get(`${config.BASE_URL}/category/getAdminAll`);
};

export const addCategory = (title: any, parentId: any) => {
  return axios.post(`${config.BASE_URL}/category/add`, {
    title: title,
    parentId: parentId,
  });
};
