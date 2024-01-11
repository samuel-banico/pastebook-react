import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Header from '../component/navbar/Header'


const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header navigation={navigation}/>
        <View>
            <Text>NotificationScreen</Text>
        </View>
    </SafeAreaView>
  )
}

export default NotificationScreen