import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (body) => {
    const url = `/email`;
    return axiosClient.post(url, body);
  },
  placeOrder: (body) => {
    const url = `/orders/add`;
    return axiosClient.post(url, body);
  },
};

export default CheckoutAPI;
