import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

import { InputValidation } from './RegisterValidation'

const Login = ({navigation}) => {

  const [input, setInput] = useState({
    email: {value: '', style: 'gray'},
    password: {value: '', style: 'gray'},
  })

  const handleChange = (fieldName, value) => {
    setInput({
      ...input,
      [fieldName]: {value: value}
    });
  };

  const borderChange = (fieldName) => {
    setInput({
      ...input,
      [fieldName]: {style: 'red'}
    });
  }

  const submitForm = () => {
    var emptyArray = InputValidation(input)
  

    emptyArray.forEach(elem => {
      borderChange(elem)
    });



  return (
    <SafeAreaView style={[styles.container, globalStyle.textParagraph, globalStyle.colorBackground]}>
      <Image 
            style={styles.logo}  
            source={require('../../assets/img/logo.png')}/>

        <View style={[globalStyle.colorBoxBG, styles.box]}>
          <View>
              <View>
                  <Text>Email: </Text>
                  <TextInput 
                    value={input.email.value} 
                    onChangeText={(e) => handleChange('email', e)} 
                    placeholder='email' 
                    style={[globalStyle.textInputBox, {borderColor: input.email.style}]}/>
              </View>
              <View>
                  <Text>Password: </Text>
                  <TextInput 
                    value={input.password.value} 
                    onChangeText={(e) => handleChange('password', e)} 
                    placeholder='password' 
                    style={[globalStyle.textInputBox, {borderColor: input.password.style}]}/>
              </View>
          </View>
          
          <TouchableOpacity style={[globalStyle.colorPimaryBG, styles.loginButton]} 
            onPress={() => submitForm()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <HR/>
          <TouchableOpacity style={[globalStyle.colorSecondaryBG, styles.registerButton, ]} onPress={() => navigation.navigate('Sign Up')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              CREATE NEW ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alignToColumn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
      width: 500,
      height: 150,
      resizeMode: 'contain',
    },
    box: {
      height: 300,
      width: 320,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginButton: {
      height: 30,
      width: 280,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    registerButton: {
      padding: 5,
      height: 30,
      borderRadius: 5,
    }
  }
)