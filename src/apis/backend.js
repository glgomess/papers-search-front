import axios from 'axios';
import dotenv from 'dotenv';
import Cookies from 'universal-cookie/es6';

dotenv.config();

function getCookie() {
  const cookies = new Cookies();
  return cookies.get(process.env.REACT_APP_COOKIE_NAME);
}

const backendApi = () =>
  axios.create({
    headers: { Authorization: getCookie() },
    baseURL: process.env.REACT_APP_HCI_SERVICE_URL,
    withCredentials: true,
  });

export default backendApi;
