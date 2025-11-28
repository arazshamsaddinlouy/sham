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

// Get single comment by ID
export const getBidCommentById = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bid-comments/${id}`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Get user's comments
export const getUserBidComments = (params?: {
  page?: number;
  limit?: number;
}) => {
  const header = localStorage.getItem("accessToken");
  return axios.get(`${config.BASE_URL}/bid-comments/user/comments`, {
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
  return axios.get(`${config.BASE_URL}/bid-comments/${commentId}/replies`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    params,
  });
};

// Create a new comment
export const createBidComment = (data: CreateCommentData) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/bid-comments/create`, data, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
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
    `${config.BASE_URL}/bid-comments/${parentId}/replies`,
    data,
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Update comment
export const updateBidComment = (id: string, data: UpdateCommentData) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(`${config.BASE_URL}/bid-comments/${id}/update`, data, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Toggle comment approval (for admins/moderators)
export const toggleBidCommentApproval = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.put(
    `${config.BASE_URL}/bid-comments/${id}/toggle-approval`,
    {},
    {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};

// Delete comment (soft delete)
export const deleteBidComment = (id: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.delete(`${config.BASE_URL}/bid-comments/${id}/delete`, {
    headers: {
      authorization: `Bearer ${header}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

// Get all comments for a specific bid
// This uses the existing route structure - you might need to adjust based on your backend
export const getBidComments = (
  bidId: string,
  params?: {
    page?: number;
    limit?: number;
    includeReplies?: boolean;
  }
) => {
  const header = localStorage.getItem("accessToken");

  // Since there's no direct route for getting comments by bidId,
  // we'll use the user comments route and filter on frontend
  // Alternatively, you could create a new backend route: /bid-comments/bid/:bidId
  return axios
    .get(`${config.BASE_URL}/bid-comments/user/comments`, {
      headers: {
        authorization: `Bearer ${header}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      params,
    })
    .then((response) => {
      // Filter comments by bidId on the frontend
      if (response.data.success) {
        let comments = Array.isArray(response.data.data)
          ? response.data.data
          : response.data.data.comments;

        // Filter by bidId
        comments = comments.filter(
          (comment: BidComment) => comment.bidId === bidId
        );

        // Handle replies if includeReplies is true
        if (params?.includeReplies) {
          // This would require additional API calls to get replies for each comment
          // For now, we return the comments and replies would need to be fetched separately
          return {
            ...response,
            data: {
              ...response.data,
              data: comments,
            },
          };
        }

        return {
          ...response,
          data: {
            ...response.data,
            data: comments,
          },
        };
      }
      return response;
    });
};

// Alternative implementation if you create a new backend route:
// export const getBidComments = (bidId: string, params?: any) => {
//   const header = localStorage.getItem("accessToken");
//   return axios.get(`${config.BASE_URL}/bid-comments/bid/${bidId}`, {
//     headers: {
//       authorization: `Bearer ${header}`,
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//     params,
//   });
// };
