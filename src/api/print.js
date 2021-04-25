import axios from "axios";

export const getPrintQueue = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/print`).then((response) => {
    if (response.status === 200) {
      return response.data;
    }
  });
};
