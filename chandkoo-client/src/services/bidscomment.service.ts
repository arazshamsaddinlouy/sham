import axios from "axios";
import { config } from "./config.service";

export interface BidComment {
  id?: string;
  bidId: string;
  userId: number;
  rating: number;
  comment: string;
  isApproved: boolean;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
  };
  bid?: {
    id: string;
    title: string;
  };
  replies?: BidComment[];
  parent?: BidComment;
}

export interface BidCommentsResponse {
  success: boolean;
  data:
    | BidComment[]
    | {
        comments: BidComment[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
      };
  message: string;
}

export interface BidCommentResponse {
  success: boolean;
  data: BidComment;
  message: string;
}

export interface CreateCommentData {
  bidId: string;
  rating: number;
  comment: string;
  parentId?: string;
}

export interface UpdateCommentData {
  rating?: number;
  comment?: string;
}

// Create a new comment
export const createBidComment = (data: CreateCommentData) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/bids/comments`, data, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Get all comments for a bid
export const getBidComments = (
  bidId: string,
  params?: {
    page?: number;
    limit?: number;
    includeReplies?: boolean;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/${bidId}/comments`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get single comment by ID
export const getBidCommentById = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/comments/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Update comment
export const updateBidComment = (id: string, data: UpdateCommentData) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/bids/comments/${id}`, data, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Delete comment (soft delete)
export const deleteBidComment = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/bids/comments/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Toggle comment approval (for admins/moderators)
export const toggleBidCommentApproval = (id: string, isApproved: boolean) => {
  const header = localStorage.getItem("accessToken");
  return axios.patch(
    `${config.BASE_URL}/bids/comments/${id}/approval`,
    { isApproved },
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Get user's comments
export const getUserBidComments = (params?: {
  page?: number;
  limit?: number;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/user/comments`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Get comment replies
export const getCommentReplies = (
  commentId: string,
  params?: {
    page?: number;
    limit?: number;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bids/comments/${commentId}/replies`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Create a reply to a comment
export const createCommentReply = (
  parentId: string,
  data: {
    bidId: string;
    rating: number;
    comment: string;
  }
) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/bids/comments/${parentId}/replies`,
    data,
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
