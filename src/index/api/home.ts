import request from '@/utils/request';

// tslint:disable-next-line:only-arrow-functions
export const getMovieList = function(cate: string) {
  return request({
    url: '/api/movie/' + cate,
    method: 'GET',
  });
};
