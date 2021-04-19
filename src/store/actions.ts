// eslint-disable-next-line import/no-cycle
import { getCart } from 'network/cart';

const actions = {
  updateCart(context: any): void {
    getCart().then((res) => {
      context.commit('addCart', { count: res.data.data.length || 0 });
    });
  },
};

export default actions;
