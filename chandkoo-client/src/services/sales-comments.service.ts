import axios from "axios";
import { config } from "./config.service";

export interface SaleComment {
  id?: string;
  saleId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  sale?: {
    id: string;
    title: string;
    saleType: string;
  };
}

export interface SaleCommentsResponse {
  success: boolean;
  data:
    | SaleComment[]
    | {
        comments: SaleComment[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
      };
  message: string;
}

export interface SaleCommentResponse {
  success: boolean;
  data: SaleComment;
  message: string;
}

// Get all comments for a specific sale
export const getSaleComments = (
  saleId: string,
  params?: {
    page?: number;
    limit?: number;
    approvedOnly?: boolean;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sale-comments/sale/${saleId}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get all comments for a specific user
export const getUserComments = (
  userId: string,
  params?: {
    page?: number;
    limit?: number;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sale-comments/user/${userId}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get single comment by ID
export const getCommentById = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/sale-comments/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Create new comment
export const createComment = (commentData: {
  saleId: string;
  rating: number;
  text: string;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/sale-comments/create`, commentData, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Update comment
export const updateComment = (
  id: string,
  updateData: {
    rating?: number;
    text?: string;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(
    `${config.BASE_URL}/sale-comments/${id}/update`,
    updateData,
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Delete comment
export const deleteComment = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/sale-comments/${id}/delete`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Toggle comment approval (admin only)
export const toggleCommentApproval = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(
    `${config.BASE_URL}/sale-comments/${id}/toggle-approval`,
    {},
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
