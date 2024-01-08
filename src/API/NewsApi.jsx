import axiosClient from "./axiosClient";

const NewsApi = {
  getNews: () => {
    const url = "/news";
    return axiosClient.get(url);
  },
};

export default NewsApi;
