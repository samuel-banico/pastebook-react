import axios from 'axios';

import { config } from '../../assets/config/config';

const homeURL = `${config()}:7185/api/home`;

export const getNavbarRequest = async(auth) => {
  return await axios.get(homeURL + '/getNavbarRequest', {
    headers: {
        Authorization: auth
    }})
}