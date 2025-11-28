import axios from "axios";
import { config } from "./config.service";

export interface Branch {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  whatsapp: string;
  youtube: string;
  facebook: string;
  lat: number;
  lng: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerData {
  id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  address: string;
  phone_number: string;
  lat: number;
  lng: number;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  whatsapp?: string;
  youtube?: string;
  facebook?: string;
  branches: Branch[];
}

export const getSellerDetails = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/user/${id}/getSellerDetails`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
