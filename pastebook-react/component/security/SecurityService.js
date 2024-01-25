import axios from "axios";

import { config } from '../../assets/config/config';

const securityURL = `${config()}:7185/api/users`;

export const getUserSecurity = async (auth, data) => {
    return await axios.post(securityURL + '/getPassword', data, {
        headers : {
            Authorization: auth
        }
    })
}