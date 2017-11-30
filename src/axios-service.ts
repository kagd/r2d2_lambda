import axios, {
  AxiosInstance,
  AxiosPromise,
} from 'axios';
import { BATTLE_NET_URL } from './constants';

let _instance: AxiosInstance;

function getInstance() {
  return _instance || initializeAxios();
}

function initializeAxios() {
  return _instance = axios.create({ baseURL: BATTLE_NET_URL });
}

const diablo = function() {
  const instance = getInstance();

  return {
    fetchProfile: (): AxiosPromise => {
      return instance.request({
        method: 'get',
        params: {
          apikey: process.env.BNET_KEY,
          locale: 'en_US',
        },
        url: `/d3/profile/${process.env.BNET_TAG}/`,
      });
    },
  };
};

export default {
  diablo: diablo(),
};
