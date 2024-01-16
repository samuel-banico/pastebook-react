import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={[styles.container, globalStyle.textParagraph, globalStyle.colorBackground]}>
      <Image 
            style={styles.logo} 
            source={require('../../assets/img/logo.png')}/>

        <View style={[globalStyle.colorBoxBG, styles.box]}>
          <View>
              <View>
                  <Text>Email: </Text>
                  <TextInput placeholder='email' style={globalStyle.textInputBox}/>
              </View>
              <View>
                  <Text>Password: </Text>
                  <TextInput placeholder='password' style={globalStyle.textInputBox}/>
              </View>
          </View>
          
          <TouchableOpacity style={[globalStyle.colorPimaryBG, styles.loginButton]} onPress={() => navigation.navigate('Home')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <HR/>
          <TouchableOpacity style={[globalStyle.colorSecondaryBG, styles.registerButton]} onPress={() => navigation.navigate('Sign Up')}>
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