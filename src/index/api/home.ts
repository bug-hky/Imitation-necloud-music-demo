import request from '@/utils/request';

// tslint:disable-next-line:only-arrow-functions
export const getBanner = () => {
  return request({
    url: '/banner',
    method: 'GET',
  });
};

export const logout = () => {
  return request({
    url: '/logout',
    method: 'GET',
  });
};

export const refreshLogin = () => {
  return request({
    url: '/login/refresh',
    method: 'GET',
  });
};

export const getRecord = (id: any, type: any) => {
  return request({
    url: '/user/record?uid=' + id + '&type=' + type,
    method: 'GET',
  });
};
