import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import FriendRequest from '../../component/friendRequest/FriendRequest'


const FriendRequestScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FriendRequest navigation={navigation}/>
    </SafeAreaView>
  )
}

export default FriendRequestScreen