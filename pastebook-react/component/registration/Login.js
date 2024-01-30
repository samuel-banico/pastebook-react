import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'

import Toast from 'react-native-toast-message';
import Entypo from '@expo/vector-icons/Entypo'


import globalStyle from '../../assets/styles/globalStyle'

import {getTokenData, setTokenData} from '../others/LocalStorage'
import { InputValidation, InputEmpty } from './RegisterValidation'

import HR from '../others/HR'

import { login, validateToken } from './RegisterService';


const Login = ({navigation, fetchData}) => {

  useEffect(() => {
      const getToken = async() => {
        const val = await getTokenData();

        if(val != null) {
          await validateToken(val)
          .then(response => {
            if(response.data) {
              navigation.navigate('Home')
            }
          })
        }
      }

      getToken()
  }, [])
  
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

  const failLogin = (text1, text2) => {
    Toast.show({
      type: 'error',
      text1: text1,
      text2: text2
    });

    resetPage();
  }

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => setShowPassword(!showPassword);

  const setToken = async(value) => {
    await setTokenData(value);
  }

  const checkCredentials = async (user) => {
    fetchData(true)
    const result = await login(user)
    .then(response => {
      setToken(response.data);
      navigation.navigate('Home');
    })
    .catch(error => {
      fetchData(false)

      if(error.response && error.response.data.result === 'incorrect_credentials') 
        failLogin('Login Failed', 'Email or Password is incorrect, kindly try again.');
      else if(error.response && error.response.data.errors.Email) 
        failLogin('Login Failed', 'Not a valid email');
      else {
        failLogin('Something is wrong', 'Unindentified error, check logs')
        console.log(error)
      }
      console.log(error.response)
    })
    fetchData(false)
  }

  const submitForm = () => {
    var emptyArray = InputValidation(input);

    if(emptyArray.length > 0)
      return handleEmptyFieldsOnSubmit(emptyArray);

    var user = {
      email: '',
      password: ''
    }

    Object.keys(input).forEach((key) => {
      user[key] = input[key].value;
    });

    checkCredentials(user);
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
                    onBlur={passwordEmptyOnBlur}
                    secureTextEntry={showPassword}/>
                    <TouchableOpacity onPress={togglePassword} style={styles.icon}>
                      <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={25} style={styles.icon}/>
                    </TouchableOpacity>
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
    }, 
    icon: {
      position: 'absolute',
      right: 5,
      top: '50%',
      transform: [{ translateY: -7.5 }],
    },
  }
)