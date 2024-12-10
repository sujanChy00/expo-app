import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mutex } from 'async-mutex';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { TOKEN_KEY } from '@/constants/data';
import { LANGUAGE_KEY } from '@/providers/auth-provider';
let jwt: string | null = null;

export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getJwt() {
  if (jwt) {
    return jwt;
  }

  const prevJwt = await AsyncStorage.getItem(TOKEN_KEY);

  if (!!prevJwt && prevJwt !== 'undefined') {
    jwt = prevJwt;
    return jwt;
  }

  const res = await fetch(`${baseURL}/authenticate`, {
    method: 'GET',
  });
  const data = await res.json();

  jwt = data.jwttoken;

  AsyncStorage.setItem(TOKEN_KEY, data.jwttoken);

  return jwt;
}

export async function refreshToken() {
  if (!jwt) {
    throw new Error('jwt is not set');
  }
  const res = await fetch(`${baseURL}/refreshtoken`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`,
      isRefreshToken: 'true',
    },
  });
  const data = await res.json();
  AsyncStorage.setItem(TOKEN_KEY, data.jwttoken);
  jwt = data.jwttoken;
  return jwt;
}

const mutex = new Mutex();

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);
    await mutex.waitForUnlock();
    const token = await getJwt();
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry: boolean;
    };
    const status = error.response?.status;
    const resStatus = (error.response?.data as { status: string })?.status;
    if (
      status &&
      resStatus &&
      status >= 400 &&
      status <= 600 &&
      resStatus === 'TOKEN EXPIRED' &&
      !originalRequest._retry
    ) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          if (error) originalRequest._retry = true;
          const access_token = await refreshToken();
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
          return axiosInstance(originalRequest);
        } catch (e) {
          // @ts-ignore
          Promise.reject(e?.response?.data);
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        const access_token = await getJwt();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export function fetcher<T, U = any>(params: AxiosRequestConfig<U>) {
  return axiosInstance(params).then((res: AxiosResponse<T, U>) => res.data);
}

export type FetchError = {
  status: string;
  message: string;
};
