import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (body) => {
    const url = "/users/signup";
    return axiosClient.post(url, body);
  },
  postLogin: (body) => {
    const url = "/users/login";
    return axiosClient.post(url, body);
  },
};

export default UserAPI;
