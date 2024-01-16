import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const EditSecurity = () => {
  return (
    <View>
      <Text>editSecurity</Text>
      <Text>Email: </Text>
      <TextInput placeholder='Email'/>
      <Text>Mobile Number: </Text>
      <TextInput placeholder='Mobile Number'/>
      <Text>Password: </Text>
      <TextInput placeholder='Password'/>
    </View>
  )
}

export default EditSecurity

const styles = StyleSheet.create({})