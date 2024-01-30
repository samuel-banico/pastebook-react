import axios from "axios";

import { config } from '../../assets/config/config';

const notificationURL = `${config()}:7185/api/notif`;

export const getAllUnseenNotificationIds = async(token) => {
  return await axios.get(notificationURL + '/getAllUnseenNotificationIds', {
    headers: {
      Authorization: token
    }
  })
}

export const getNotificationById = async(data) => {
    return await axios.post(notificationURL + '/getNotificationById', data)
}

export const notificationHasSeen = async(data) => {
    return await axios.post(notificationURL + '/notificationHasSeen', data)
}