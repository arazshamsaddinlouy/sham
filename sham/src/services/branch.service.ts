import axios from "axios";
import { config } from "./config.service";

export const addBranch = (payload: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/branch/add`, payload, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const editBranch = (payload: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/branch/edit`, payload, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const deleteBranch = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/branch/delete?id=${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const getAllBranches = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/branch/getAll`, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const getBranchLocation = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/branch/getLocation`,
    { id: id },
    {
      headers: {
        authorization: `Bearer ${header}`,
      },
    }
  );
};
