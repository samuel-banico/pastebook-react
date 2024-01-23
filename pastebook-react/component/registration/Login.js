import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import { InputValidation, InputEmpty } from './RegisterValidation'

import HR from '../others/HR'

const Login = ({navigation, fetchData}) => {

  const [input, setInput] = useState({
    email: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    password: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
  });

  const handleChange = (fieldName, value) => {
    setInput({
      ...input,
      [fieldName]: {
        ...input[fieldName],
        value: value
      }
    });
  };

  const borderChange = (input, elem, style) => {
    input[elem] = {
      ...input[elem],
      style: style
    };
  };

  const clearInput = (input, elem) => {
    input[elem] = {
      ...input[elem],
      value: ''
    };
  };

  const missingFieldsAnimation = (emptyArray) => {
    emptyArray.forEach((key) => {
      const shakeAnimation = input[key].shakeAnimation;
      shakeAnimation.setValue(0);

      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      ]).start();
    });
  }

  const handleEmptyFieldsOnSubmit = (emptyArray) => {
    missingFieldsAnimation(emptyArray);

    setInput(prevInput => {
      const updatedInput = { ...prevInput };
  
      Object.keys(updatedInput).forEach((key) => {
        if (emptyArray.includes(key)) {
          borderChange(updatedInput, key, 'red');
          clearInput(updatedInput, key)
        } else {
          borderChange(updatedInput, key, 'gray');
        }
      });
  
      return updatedInput;
    });
  };

  const resetPage = () => {
    setInput(prevInput => {
      const updatedInput = { ...prevInput };
  
      Object.keys(updatedInput).forEach((key) => {
        borderChange(updatedInput, key, 'gray');
        clearInput(updatedInput, key)
      });
  
      return updatedInput;
    });
  }

  const emptyInputOnBlur = (emptyArray) => {
    missingFieldsAnimation(emptyArray);

    setInput(prevInput => {
      const updatedInput = { ...prevInput };
  
      Object.keys(updatedInput).forEach((key) => {
        if (emptyArray.includes(key)) {
          borderChange(updatedInput, key, 'red');
          clearInput(updatedInput, key)
        } 
      });
  
      return updatedInput;
    });
  }

  const hasValueOnBlur = (elem) => {
    setInput({
      ...input,
      [elem]: {
        ...input[elem],
        style: 'gray'
      }
    });
  }

  const emailEmptyOnBlur = () => {
    if(InputEmpty(input.email.value))
      return emptyInputOnBlur(['email']);

    hasValueOnBlur('email')
  }

  const passwordEmptyOnBlur = () => {
    if(InputEmpty(input.password.value))
      return emptyInputOnBlur(['password']);

    hasValueOnBlur('password')
  }

  const submitForm = () => {
    var emptyArray = InputValidation(input);

    if(emptyArray.length > 0)
      return handleEmptyFieldsOnSubmit(emptyArray);

    resetPage();
    fetchData();
  }

  return (
    <SafeAreaView style={[styles.container, globalStyle.textParagraph, globalStyle.colorBackground]}>
      <Image style={styles.logo}  
        source={require('../../assets/img/logo.png')}/>

      <View style={[globalStyle.colorBoxBG, styles.box]}>
        <View>
            <View>
                <Text>Email: </Text>
                <Animated.View style={{ transform: [{ translateX: InputEmpty(input.email.value) ? input.email.shakeAnimation : 0 }] }}>
                  <TextInput
                    value={input.email.value}
                    onChangeText={(e) => handleChange('email', e)}
                    placeholder="Email"
                    style={[
                      globalStyle.textInputBox,
                      { borderColor: input.email.style },
                    ]}
                    onBlur={emailEmptyOnBlur}
                    />
                </Animated.View>
            </View>
            <View>
                <Text>Password: </Text>
                <Animated.View style={{ transform: [{ translateX: InputEmpty(input.password.value) ? input.password.shakeAnimation : 0 }] }}>
                  <TextInput 
                    value={input.password.value}
                    onChangeText={(e) => handleChange('password', e)}
                    placeholder="Password"
                    style={[
                      globalStyle.textInputBox,
                      { borderColor: input.password.style },
                    ]}
                    onBlur={passwordEmptyOnBlur}/>
                </Animated.View>
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