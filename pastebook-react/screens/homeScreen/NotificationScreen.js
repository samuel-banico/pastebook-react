import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Header from '../../component/navbar/Header'
import Notification from '../../component/notification/Notification'

const NotificationScreen = () => {
  return (
    <SafeAreaView>
      <Notification/>
    </SafeAreaView>
  )
}

export default NotificationScreen