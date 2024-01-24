import { View, Text, SafeAreaView, TextInput, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import Register from '../component/registration/Register';

import Modal from 'react-native-modal'

import Loading from '../component/others/Loading';

const RegisterScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);

  const showLoading = (value) => {
    setIsLoading(value)
  }

  return (
    <View style={styles.container}>
      <Register navigation={navigation} isLoading={showLoading}/> 
      <Modal isVisible={isLoading}>
        <Loading />
      </Modal>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  }
})