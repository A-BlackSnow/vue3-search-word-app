import createNetwork from './network';

const network = createNetwork({
  baseURL: process.env.VUE_APP_BASIC_URL,
  timeout: 1000 * 20,
  withCredentials: true,
});

export default network;
