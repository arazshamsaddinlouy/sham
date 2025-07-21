import axios from "axios";
import { config } from "./config.service";

export const getAllCity = (province_id: string) => {
  return axios.get(`${config.BASE_URL}/city/getAll?id=${province_id}`);
};
