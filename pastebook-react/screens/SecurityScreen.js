import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Security from '../component/security/Security'

const SecurityScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Security navigation={navigation}/>
    </View>
  )
}

export default SecurityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})