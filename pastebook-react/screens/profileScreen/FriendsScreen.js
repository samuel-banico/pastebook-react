import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ProfileFriend from '../../component/profile/ProfileFriend'

const FriendsScreen = ({navigation, userId}) => {
  return (
    <View>
      <ProfileFriend navigation={navigation} userId={userId}/>
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})