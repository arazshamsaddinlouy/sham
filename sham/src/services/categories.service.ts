import axios from "axios";
import { config } from "./config.service";
export const getAllCategories = () => {
  return axios.get(`${config.BASE_URL}/category/getAll`);
};
