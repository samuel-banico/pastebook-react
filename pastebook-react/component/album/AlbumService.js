import axios from "axios";

import { config } from '../../assets/config/config';

const albumUrl = `${config()}:7185/api/albums`;
const albumImageUrl = `${config()}:7185/api/albumImage`;

export const createAlbum = async (token, data) => {
    return await axios.post(albumUrl, data, {
        headers: {
            Authorization: token
        }
    })
}

export const createImageForAlbum = async (albumId, data) => {
    return await axios.post(albumImageUrl + `?albumId=${albumId}`, data, 
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getAlbumDetailsById = async(data) => {
    return await axios.post(albumUrl + '/getAlbumDetailsById', data)
}

export const getAlbumImagePhotoById = async(data) => {
    return await axios.post(albumImageUrl + '/getAlbumImagePhotoById', data)
}

export const deleteAlbumById = async(data) => {
    return axios.post(albumUrl + '/deleteAlbumById', data)
}