import axios from "axios";

export const getSearchedLocations = (
  search_term: string,
  lat: number,
  lng: number
) => {
  return axios.get(
    `https://api.neshan.org/v1/search?term=${search_term}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        "Api-Key": "service.9826b54ea8c14df0856ca93346709a67",
      },
    }
  );
};

export const convertLocationToAddress = (lat: number, lng: number) => {
  return axios.get(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
    headers: {
      "Api-Key": "service.9826b54ea8c14df0856ca93346709a67",
    },
  });
};
