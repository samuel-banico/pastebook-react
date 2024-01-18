import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const Logout = ({navigation}) => {
  return (
    <View>
        <TouchableOpacity 
          style={[globalStyle.colorPimaryBG, styles.container]}
          onPress={() => navigation.navigate('Login')}>
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