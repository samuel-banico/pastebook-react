import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Logout from '../component/settings/Logout'
import Security from '../component/settings/Security'

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView>
        <Security navigation={navigation}/>
        <Logout navigation={navigation}/>
    </SafeAreaView>
  )
}

export default SettingsScreen