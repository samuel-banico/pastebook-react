import { View, Text, SafeAreaView, TextInput, StyleSheet, Button } from 'react-native';
import React from 'react';
import Login from '../component/registration/Login';

const RegisterScreen = ({navigation}) => {
  return (
    <Login navigation={navigation}/>
  )
}

export default RegisterScreen