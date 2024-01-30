import axios from "axios";

import { config } from '../../assets/config/config';

const homeURL = `${config()}:7185/api/home`;
const postLikeURL = `${config()}:7185/api/postLike`;

export const getOnlineFriends = async(data) => {
  return await axios.get(homeURL + '/getOnlineFriends', {
    headers: {
      Authorization: data
    }
  })
}

export const getOnlineFriendById = async (token, data) => {
  return await axios.post(homeURL + '/getOnlineFriendById', data, {
    headers: {
      Authorization: token
    }
  })
}

export const getHomeUserData = async (token) => {
  return await axios.get(homeURL + '/getHomeUserData', {
    headers: {
      Authorization: token
    }
  })
}

export const getFeedPosts = async(token) => {
  return await axios.get(homeURL + '/getFeedPosts', {
    headers: {
      Authorization: token
    }
  })
}

export const getFeedPostById = async (token, data) => {
  return await axios.post(homeURL + '/getFeedPostById', data, {
    headers: {
      Authorization: token
    }
  })
}

export const userLikedPost = async (token, data) => {
  return await axios.post(postLikeURL + '/userLikedPost', data, {
    headers: {
      Authorization: token
    }
  })
}

export const userDislikedPost = async (token, data) => {
  return await axios.post(postLikeURL + '/userDislikedPost', data, {
    headers: {
      Authorization: token
    }
  })
}