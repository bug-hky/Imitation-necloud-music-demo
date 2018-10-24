import * as axios from 'axios';
import { Toast } from 'vant';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:3000';
// const baseURL = 'https://api.douban.com/v2/movie/';
const service = axios.default.create({
  baseURL,
  timeout: 0,
  maxContentLength: 4000,
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  Promise.reject(error);
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response.data) {
      Toast.fail('请求错误！');
    } else {
      return response.data;
    }
  },
  (error: any) => {
    return Promise.reject(error);
  });

export default service;
