import axios from "axios";

import { config } from '../../assets/config/config';

const friendRequestURL = `${config()}:7185/api/friendRequest`;
const friendURL = `${config()}:7185/api/friend`;

export const getAllFriendRequest = async(data) => {
  return await axios.get(friendRequestURL + '/getAllFriendRequest', {
    headers: {
      Authorization: data
    }
  })
}

export const getFriendRequestDetailsById = async(data) => {
  return await axios.post(friendRequestURL + '/getFriendRequestDetailsById', data)
}

export const rejectFriendRequest = async(data) => {
  return await axios.post(friendRequestURL + '/rejectFriendRequest', data)
}

export const acceptedFriendRequest = async(data) => {
  return await axios.post(friendURL + '/acceptedFriendRequest', data)
}