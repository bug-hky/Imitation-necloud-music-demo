import request from '@/utils/request';

// tslint:disable-next-line:only-arrow-functions
export const getBanner = function() {
  return request({
    url: '/banner',
    method: 'GET',
  });
};
