import request from '@/utils/request';

export const playlistDeatils = (id: number) => {
  return request({
    url: '/playlist/detail?id=' + id,
    method: 'GET',
  });
};

export const getSongUrl = (id: string) => {
  return request({
    url: '/song/url?id=' + id,
    method: 'GET',
  });
};

export const getSongDetails = (id: string) => {
  return request({
    url: '/song/detail?ids=' + id,
    method: 'GET',
  });
};

export const getLyric = (id: string) => {
  return request({
    url: '/lyric?id=' + id,
    method: 'GET',
  });
};
