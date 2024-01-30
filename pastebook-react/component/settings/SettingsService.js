import axios from 'axios';

import { config } from '../../assets/config/config';

const userURL = `${config()}:7185/api/users`;

export const settingsGetUserData = async(auth) => {
  return await axios.get(userURL + '/settingsGetUserData', {
    headers: {
        Authorization: auth
    }})
}

export const toggleViewPublic = async(auth, data) => {
  return await axios.put(userURL + '/toggleViewPublic', data, {
    headers: {
        Authorization: auth
    }})
}