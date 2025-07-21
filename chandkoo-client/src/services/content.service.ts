import axios from "axios";
import { config } from "./config.service";

export const getAllMenus = () => {
  return axios.get(`${config.BASE_URL}/content/getAllMenus`);
};
export const getAllFooters = () => {
  return axios.get(`${config.BASE_URL}/content/getAllFooters`);
};
export const getAllSellers = () => {
  return axios.get(`${config.BASE_URL}/content/getAllSellers`);
};
export const getAllSales = () => {
  return axios.get(`${config.BASE_URL}/content/getAllSales`);
};
export const getAllTrades = () => {
  return axios.get(`${config.BASE_URL}/content/getAllTrades`);
};
