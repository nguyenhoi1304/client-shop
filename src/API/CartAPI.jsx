import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: (query) => {
    const url = `/carts${query}`;
    return axiosClient.get(url);
  },

  postAddToCart: (body) => {
    const url = `/carts/add`;
    return axiosClient.post(url, body);
  },

  deleteToCart: (query) => {
    const url = `/carts/delete${query}`;
    return axiosClient.delete(url);
  },

  putToCart: (body) => {
    const url = `/carts/update`;
    return axiosClient.put(url, body);
  },
};

export default CartAPI;
