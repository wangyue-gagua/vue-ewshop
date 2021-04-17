import axios, { AxiosRequestConfig } from 'axios';
import { Notify, Toast } from 'vant';

// eslint-disable-next-line import/no-cycle
import router from '../router';

export default function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000,
  });
  // interceptors
  instance.interceptors.request.use(
    // eslint-disable-next-line no-shadow
    (config) => {
      // if need authentication to access an api
      const token = window.localStorage.getItem('access_token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      // permit through
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      console.log(res);
      // return res.data ? res.data : res;
      return res;
    },
    (err) => {
      // if need authentication login
      if (err.response?.status === 401) {
        Toast.fail('请先登录');
        setTimeout(() => {
          router.push({ path: '/login' });
        }, 100);
      }
      // handling error message
      Notify(
        err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
      );
    },
  );

  return instance(config);
}
