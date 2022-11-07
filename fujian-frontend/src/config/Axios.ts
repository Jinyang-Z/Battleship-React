import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { GetTokenCookie, UnsetTokenCookie } from '../utils/Token';
import { GetLanguageCookie } from '../utils/Languages';

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_ENVIRONNEMENT === 'prod'
      ? process.env.REACT_APP_PRODUCTION_BACK_URL
      : process.env.REACT_APP_BACK_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
    'Accept-Language': GetLanguageCookie(),
  },
  timeout: 30000,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const transactionId = Math.random().toString(36).substring(2, 9);
  const newConfig = config;
  newConfig.headers!['X-Transaction-ID'] = transactionId;
  newConfig.headers!.Authorization = `Bearer ${GetTokenCookie()}`;
  return newConfig;
});

instance.interceptors.response.use(
  async (config) => config,
  (error) => {
    if (error.response?.status === 401) {
      const navigate = useNavigate();
      navigate('/signin');
      UnsetTokenCookie();
    }
    return Promise.reject(error);
  },
);

export default instance;
