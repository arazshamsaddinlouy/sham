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

export interface Bid {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  currentPrice: string;
  images: string[];
  status: string;
  startDate: string;
  endDate: string;
  bidCount: number;
  viewCount: number;
  categoryId: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  saleType: "market" | "product";
  title: string | null;
  description: string | null;
  salePercentFrom: number | null;
  salePercentTo: number | null;
  primaryPrice: string | null;
  salePrice: string | null;
  images: string[];
  viewCount: number;
  likeCount: number;
  expiresAt: string | null;
  createdAt: string;
  categoryId: string | null;
}

export interface Statistics {
  total_branches: number;
  total_bids: number;
  total_sales: number;
  active_bids: number;
  active_sales: number;
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
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  branches: Branch[];
  bids: Bid[];
  sales: Sale[];
  statistics: Statistics;
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
