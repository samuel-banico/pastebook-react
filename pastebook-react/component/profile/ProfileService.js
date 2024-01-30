import axios from "axios";

import { config } from '../../assets/config/config';

const profilePostURL = `${config()}:7185/api/posts`;
const profileUserURL = `${config()}:7185/api/users`
const profileFriendURL = `${config()}:7185/api/friend`
const profileAlbumURL = `${config()}:7185/api/albums`
const profileFriendRequestURL = `${config()}:7185/api/friendRequest`

export const getOwnProfilePost = async(data) => {
  return await axios.post(profilePostURL + '/getOwnProfilePost', data)
}

export const getProfileUserDetails = async(data) => {
    return await axios.post(profileUserURL + '/getProfileUserDetails', data)
  }

export const getUserRelationship = async(token, data) => {
  return await axios.post(profileUserURL + '/getUserRelationship', data, {
    headers: {
      Authorization: token
    }
  })
}

export const getAllFriends = async(data) => {
  return await axios.post(profileFriendURL + '/getAllFriends', data)
}

export const getUserById = async(data) => {
  return await axios.post(profileUserURL + '/getUserById', data)
}

export const getAllUserAlbum = async(data) => { 
  return await axios.post(profileAlbumURL + '/getAllUserAlbum', data)
}

export const getAlbumById = async(data) => {
  return await axios.post(profileAlbumURL + '/getAlbumById', data)
}

export const sendFriendRequest = async (token, data) => {
  return await axios.post(profileFriendRequestURL + '/sendFriendRequest', data, {
    headers: {
      Authorization: token
    }
  })
}