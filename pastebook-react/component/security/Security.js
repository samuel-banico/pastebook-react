import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message'

import { getUserSecurity } from './SecurityService'
import { getTokenData } from '../others/LocalStorage'

import globalStyle from '../../assets/styles/globalStyle'

import EditSecurity from './EditSecurity'
import { InputEmpty } from '../registration/RegisterValidation'


const Security = () => {

  const [showSecurity, setShowSecurity] = useState(false);

  const [passwordSecurity, setPasswordSecurity] = useState({
    value: '',
    message: '',
    style: 'black'
  });

  const changeBorderSecurity = (value) => {
    setPasswordSecurity({
      ...passwordSecurity,
      style: value
    })
  }

  const changeSecurityValue = (value) => {
    setPasswordSecurity({
      ...passwordSecurity,
      value: value
    })
  }

  const showErrorToast = (text1, text2) => {
    Toast.show({
      type: 'error',
      text1: text1,
      text2: text2
    });
  }

  const getUser = async() => {
    const token = await getTokenData();
    const data = {
      password: passwordSecurity.value
    }
    await getUserSecurity(token, data)
    .then(response => {
      setShowSecurity(!showSecurity);
    })
    .catch(error => {
      if(error.response && error.response.data.result === 'password_incorrect')
        return showErrorToast('Password', 'Incorrect Password, kindly try again');

      console.log(error)
    })
  }

  const confirmClick = () => {
    if(InputEmpty(passwordSecurity.value)) {
      return changeBorderSecurity('red')
    }

    changeBorderSecurity('black')

    getUser();
  }

  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
      {
        !showSecurity && (
          <View style={[styles.confirmContainer]}>
            <TextInput 
              style={[styles.textContainer, {borderColor: passwordSecurity.style}]} 
              placeholder='Enter Password'
              value={passwordSecurity.value}
              onChangeText={(e) => changeSecurityValue(e)}/>
            <TouchableOpacity 
              style={[globalStyle.colorSecondaryBG, styles.buttonContainer]}
              onPress={confirmClick}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )
      }
      
      {
        showSecurity && (
          <EditSecurity/>
        )
      }
    </View>
  )
}

export default Security

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confirmContainer: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 15
  },
  textContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingLeft: 10
  },
  buttonContainer: {
    alignItems:'center',
    marginTop: 10,
    borderRadius: 5,
    padding: 5
  }
})