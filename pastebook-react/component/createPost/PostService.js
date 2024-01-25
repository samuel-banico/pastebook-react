import axios from "axios";

import { config } from '../../assets/config/config';

const postUrl = `${config()}:7185/api/posts`;

export const createPost = async (data) => {
    return await axios.post(postUrl, data)
}