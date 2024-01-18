import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import EditSecurity from './EditSecurity'

const Security = () => {

  const [showSecurity, setShowSecurity] = useState(false);

  const confirmSecurity = () => {
    setShowSecurity(!showSecurity);
  }

  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
      {
        !showSecurity && (
          <View style={[styles.confirmContainer]}>
            <TextInput style={[styles.textContainer]} placeholder='Enter Password'/>
            <TouchableOpacity 
              style={[globalStyle.colorSecondaryBG, styles.buttonContainer]}
              onPress={() => confirmSecurity()}>
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