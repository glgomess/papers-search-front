import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const backendApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_HCI_SERVICE_URL,
    withCredentials: true,
  });

export default backendApi;
