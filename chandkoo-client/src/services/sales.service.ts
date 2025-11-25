import axios from "axios";
import { config } from "./config.service";

export interface Sale {
  id?: string;
  saleType: "market" | "product";
  title?: string;
  description?: string;
  isActive: boolean;
  notes?: string;
  salePercentFrom?: number;
  salePercentTo?: number;
  marketSaleDescription?: string;
  primaryPrice?: number;
  salePrice?: number;
  categoryId?: string;
  sellerId: string;
  images?: string[];
  viewCount?: number;
  likeCount?: number;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: string;
    title: string;
  };
  seller?: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  comments?: any[];
}

export interface SalesResponse {
  success: boolean;
  data:
    | Sale[]
    | {
        sales: Sale[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
      };
  message: string;
}

export interface SaleResponse {
  success: boolean;
  data: Sale;
  message: string;
}

// Get all sales for a specific user
export const getUserSales = () => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sales/user`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Get all sales with pagination and filters
export const getAllPublishedSales = (params?: {
  page?: number;
  limit?: number;
  saleType?: "market" | "product";
  isActive?: boolean;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sales/all`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get single sale by ID
export const getSaleById = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sales/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Create new sale with image upload
export const createSale = (formData: FormData) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/sales/create`, formData, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update sale with image upload
export const updateSale = (id: string, formData: FormData) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/sales/${id}/update`, formData, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete sale
export const deleteSale = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/sales/${id}/delete`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Toggle sale active status
export const toggleSaleStatus = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(
    `${config.BASE_URL}/sales/${id}/toggle-status`,
    {},
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Like a sale
export const likeSale = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/sales/${id}/like`,
    {},
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
