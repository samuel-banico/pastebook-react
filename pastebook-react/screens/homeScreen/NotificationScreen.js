import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

import Header from '../../component/navbar/Header'
import Notification from '../../component/notification/Notification'

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Notification/>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})