import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const backendApi = () =>
  axios.create({
    headers: { Authorization: '' },
    baseURL: process.env.REACT_APP_HCI_SERVICE_URL,
  });

export default backendApi;
