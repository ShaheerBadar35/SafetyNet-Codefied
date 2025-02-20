import axios, {AxiosInstance} from 'axios';
import {IOS} from './constants';
import {BASE_URL} from './endpoints';

const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

const initialConfig = () => {
  setupAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      if (!IOS) {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (err: any) => {
      Promise.reject(err);
    },
  );

  HTTP_CLIENT.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      if (err?.response?.status == 400) {
        return err?.response;
      }
      if (err?.response?.status == 401) {
        return err?.response;
      }
      if (err?.response?.status == 405) {
        return err?.response;
      }
      if (err?.response?.status == 422) {
        return err?.response;
      }
      if (err?.response?.status == 500) {
        return err?.response;
      }
    },
  );
};

export {HTTP_CLIENT, setupAxios, initialConfig};
