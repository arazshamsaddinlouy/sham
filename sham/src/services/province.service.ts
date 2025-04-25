import axios from "axios";
import { config } from "./config.service";

export const getAllProvinces = () => {
  return axios.get(`${config.BASE_URL}/province/getAll`);
};

export const getAllProvincesWithCities = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/province/getAllWithCities`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
