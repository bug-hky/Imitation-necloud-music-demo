import request from '@/utils/request';

export const getSubCount = () => {
  return request({
    url: '/user/subcount',
    method: 'GET',
  });
};

export const playlist = (id: number) => {
  return request({
    url: '/user/playlist?uid=' + id,
    method: 'GET',
  });
};

