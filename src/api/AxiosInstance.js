import axios from 'axios';
import qs from 'qs';
import { baseUrl } from './config';

// axios config options
const options = {
  baseURL: baseUrl,
  timeout: 10000,
  retry: 3,
  retryDelay: 1000,
  // 查询对象序列化函数
  paramsSerializer: (params) => qs.stringify(params),
};

const AxiosInstance = axios.create(options);

// 设置请求重试机制
AxiosInstance.interceptors.response.use(undefined, (err) => {
  const config = err.config;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount += 1;
  return new Promise((resolve) => {
    setTimeout(() => resolve(), config.retryDelay);
  }).then(() => axios(config));
});

// GET 获取数据
export const GET = (url, params, config) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.get(url, { params, ...config }).then((res) => {
      resolve(res);
    }).catch((error) => reject(error));
  });
};

// POST 提交数据
export const POST = (url, data, config) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.post(url, data, config)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

// PATCH 修改数据
export const PATCH = (url, data, config) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.patch(url, data, config)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

// DELETE 删除数据
export const DELETE = (url, config) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.delete(url, config)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export default AxiosInstance;
