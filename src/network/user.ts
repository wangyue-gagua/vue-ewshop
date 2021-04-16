import request from './request';

interface RegisterPara {
  name: string,
  email: string,
  password: string,
  // eslint-disable-next-line camelcase
  password_confirmation: string
}

export function register(data: RegisterPara) {
  return request({
    url: '/api/auth/register',
    method: 'POST',
    data,
  });
}

export function Login(data: { email: string, password: string }) {
  return request({
    url: '/api/auth/login',
    method: 'POST',
    data,
  });
}

export function Logout() {
  return request({
    url: '/api/auth/logout',
    method: 'POST',
  });
}

export function getUser() {
  return request({
    url: '/api/user',
  });
}
