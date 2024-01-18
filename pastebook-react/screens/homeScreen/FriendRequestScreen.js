import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import FriendRequest from '../../component/friendRequest/FriendRequest'


const FriendRequestScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FriendRequest/>
    </SafeAreaView>
  )
}

export default FriendRequestScreen