import { View, Text } from 'react-native'
import React from 'react'

import axios from 'axios';

import { config } from '../../assets/config/config';

const accessURL = `${config()}:7185/api/access`;

export const register = async(data) => {
  return await axios.post(accessURL + '/register', data)
}

export const login = async(data) => {
  console.log(data);
  return await axios.post(accessURL + '/login', data)
}

export const validateToken = async(data) => {
  return await axios.get(accessURL + '/validateToken', 
    {
      headers: {
        Authorization: data
      }
  })
}