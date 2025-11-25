import axios from "axios";
import { config } from "./config.service";
import { BidComment } from "./bidscomment.service";

export interface Bid {
  id?: string;
  title: string;
  description?: string;
  startingPrice: number;
  currentPrice: number;
  images?: string[];
  categoryId: number;
  userId: number;
  status: "active" | "completed" | "cancelled" | "expired";
  startDate: string;
  endDate?: string;
  bidCount: number;
  viewCount: number;
  highestBidderId?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  category?: {
    id: number;
    title: string;
  };
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  highestBidder?: {
    id: number;
    first_name: string;
    last_name: string;
  };
  comments?: BidComment[];
  offers?: BidOffer[];
}

export interface BidOffer {
  id?: string;
  bidId: string;
  userId: number;
  amount: number;
  isHighest: boolean;
  createdAt?: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

export interface BidsResponse {
  success: boolean;
  data:
    | Bid[]
    | {
        bids: Bid[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
      };
  message: string;
}

export interface BidResponse {
  success: boolean;
  data: Bid;
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: "active" | "completed" | "cancelled" | "expired";
  categoryId?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

// Create a new bid
export const createBid = (formData: FormData) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/bids/create`, formData, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get all bids with pagination and filters
export const getAllBids = (params?: PaginationParams) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/all`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get single bid by ID
export const getBidById = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/getById/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Update bid
export const updateBid = (id: string, formData: FormData) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/bids/${id}`, formData, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete bid (soft delete)
export const deleteBid = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/bids/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Update bid status
export const updateBidStatus = (id: string, status: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.patch(
    `${config.BASE_URL}/bids/${id}/status`,
    { status },
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Get user's bids
export const getUserBids = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/user`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Place a bid offer
export const placeBidOffer = (bidId: string, amount: number) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/bids/${bidId}/place-offer`,
    { amount },
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Get bid offers for a specific bid
export const getBidOffers = (
  bidId: string,
  params?: {
    page?: number;
    limit?: number;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/${bidId}/offers`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get user's bid offers
export const getUserBidOffers = (params?: {
  page?: number;
  limit?: number;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/user/offers`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};
