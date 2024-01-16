import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import EditSecurity from './EditSecurity'

const Security = () => {
  return (
    <View>
      <TextInput placeholder='Confirm Password'/>
      <EditSecurity/>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({})