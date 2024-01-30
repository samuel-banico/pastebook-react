import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

import Header from '../../component/navbar/Header'
import Notification from '../../component/notification/Notification'

const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Notification navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})