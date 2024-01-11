import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Header from '../component/navbar/Header'

const FriendRequestScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header navigation={navigation}/>
      <View>
        <Text>FriendRequestScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default FriendRequestScreen