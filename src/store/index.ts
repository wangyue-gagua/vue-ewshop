import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
// eslint-disable-next-line import/no-cycle
import mutations from './mutations';
// eslint-disable-next-line import/no-cycle
import actions from './actions';
import getters from './getters';

export interface STATE {
  user: {
    isLoggedIn: boolean,
    countCart: number,
  },
}
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<STATE>> = Symbol('shopCart');

export const store = createStore<STATE>({
  state: {
    user: {
      isLoggedIn: !!window.localStorage.getItem('access_token'),
      countCart: 0,
    },
  },
  mutations,
  actions,
  getters,
});

export function useStore() {
  return baseUseStore(key);
}
