import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import { removeTokenData } from '../others/LocalStorage'

const Logout = ({navigation}) => {
  const removeToken = async() => {
    await removeTokenData()
  }

  const logOut = () => {
    removeToken()
    navigation.navigate('Login')
  }

  return (
    <View>
        <TouchableOpacity 
          style={[globalStyle.colorPimaryBG, styles.container]}
          onPress={logOut}>
            <Text style={[styles.textContainer]}>Log out</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 3,
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center'
  },
  textContainer: {
    color: 'white',
    fontWeight: '600',
  }
})