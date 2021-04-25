import axios from "axios";

export const getPrintQueue = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/print`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const postPrint = (printId) => {
  const body = {
    print_id: printId,
  };
  return axios.post(`${process.env.REACT_APP_API_URL}/post-print`, body);
};
