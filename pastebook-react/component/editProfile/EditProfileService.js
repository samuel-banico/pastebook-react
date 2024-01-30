import axios from "axios";

import { config } from '../../assets/config/config';

const profileUserURL = `${config()}:7185/api/users`

export const getProfileUserDetailsByToken = async(token) => {
  return await axios.get(profileUserURL + '/getProfileUserDetailsByToken', {
    headers: {
      Authorization: token
    }
  })
}

export const updateProfile = async(auth, data) => {
  return await axios.post(profileUserURL + '/updateProfile', data, {
    headers: {
      Authorization: auth
    }
  })
}

export const editUserProfilePicture = async (token, data) => {
  return await axios.post(profileUserURL + '/editUserProfilePicture', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  })
}