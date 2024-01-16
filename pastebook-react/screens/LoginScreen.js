import { View, Text } from 'react-native'
import React from 'react'
import Login from '../component/registration/Login';

const LoginScreen = ({navigation}) => {
  return (
    <Login navigation={navigation}/>
  )
}

export default LoginScreen