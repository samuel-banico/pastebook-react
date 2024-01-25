import axios from "axios";

import { config } from '../../assets/config/config';

const homeURL = `${config()}:7185/api/home`;

export const loadHome = async(data) => {
  return await axios.get(homeURL + '/getHomeDetails', {
    headers: {
      Authorization: data
    }
})
}