import request from '@/utils/request';
import { Login } from './interface';

// tslint:disable-next-line:only-arrow-functions
export const login = (loginObj: Login) => {
  return request({
    url: '/login/cellphone?phone=' + loginObj.phone + '&password=' + loginObj.password,
    method: 'GET',
  });
};

export const getUserInfo = (id: string) => {
  return request({
    url: '/user/detail?uid=' + id,
    method: 'GET',
  });
};
