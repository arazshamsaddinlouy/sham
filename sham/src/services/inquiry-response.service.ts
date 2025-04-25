import axios from "axios";
import { config } from "./config.service";

export const addPriceInquiryResponse = (payload: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/inquiry-response/add`, payload, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const addPriceMessageResponse = (payload: any) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(`${config.BASE_URL}/inquiry-response/addMessage`, payload, {
    headers: {
      authorization: `Bearer ${header}`,
    },
  });
};
export const getAllInquiryResponses = (requestId: string) => {
  const header = localStorage.getItem("accessToken");
  return axios.post(
    `${config.BASE_URL}/inquiry-response/getAllActive`,
    { requestId: requestId },
    {
      headers: {
        authorization: `Bearer ${header}`,
      },
    }
  );
};
