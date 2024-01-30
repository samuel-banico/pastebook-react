import axios from "axios";

import { config } from '../../assets/config/config';

const albumImageUrl = `${config()}:7185/api/albumImage`;

export const getAlbumImageDetailsById = async (token, data) => {
    return await axios.post(albumImageUrl + '/getAlbumImageDetailsById', data, {
        headers: {
            Authorization: token
        }
    })
}