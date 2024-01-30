import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'

import Profile from '../component/profile/Profile'

const ProfileScreen = ({navigation, route}) => {
  const { id } = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Profile navigation={navigation} userId={id}/>
    </SafeAreaView>
  )
}

export default ProfileScreen
