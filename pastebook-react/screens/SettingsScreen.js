import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Settings from '../component/settings/Settings'

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <Settings navigation={navigation}/>
    </SafeAreaView>
  )
}

export default SettingsScreen