import axios from "axios";

const getProducts = () => {
  return axios.get("https://random-data-api.com/api/food/random_food", {
    params: { size: 20 },
  });
};

export default {
  getProducts,
};
