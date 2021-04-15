import { getCart } from "../network/cart";
const actions = {
  updateCart(context: any) {
    getCart().then((res) => {
      context.commit("addCart", { count: res.data.length || 0 });
    });
  },
};

export default actions;
