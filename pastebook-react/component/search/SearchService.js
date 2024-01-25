import axios from "axios";

import { config } from '../../assets/config/config';

const searchURL = `${config()}:7185/api/home`;

export const searchUser = async (auth, data) => {
    return await axios.post(searchURL + '/searchAllUsers', data, {
        headers : {
            Authorization: auth
        }
    })
}