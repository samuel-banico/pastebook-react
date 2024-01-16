import { View, Text, SafeAreaView, TextInput, StyleSheet, Button } from 'react-native';
import React from 'react';
import Register from '../component/registration/Register';

const RegisterScreen = ({navigation}) => {
  return (
    <Register navigation={navigation}/>
  )
}

export default RegisterScreen