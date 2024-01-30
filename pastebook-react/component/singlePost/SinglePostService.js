import axios from "axios";

import { config } from '../../assets/config/config';

const postUrl = `${config()}:7185/api/posts`;
const postLikeUrl = `${config()}:7185/api/postLike`;
const postCommentUrl = `${config()}:7185/api/postComment`;


export const getAllLikesIdInPost = async (data) => {
    return await axios.post(postLikeUrl + '/getAllLikesIdInPost', data)
}

export const getUserByPostLikeId = async (data) => {
    return await axios.post(postLikeUrl + '/getUserByPostLikeId', data)
}

export const getAllCommentsIdInPost = async (data) => {
    return await axios.post(postCommentUrl + '/getAllCommentsIdInPost', data)
}

export const getUserByPostCommentId = async (data) => {
    return await axios.post(postCommentUrl + '/getUserByPostCommentId', data)
}

export const userCommentedOnPost = async (token, data) => {
    return await axios.post(postCommentUrl + '/userCommentedOnPost', data, {
        headers: {
            Authorization: token
        }
    })
}