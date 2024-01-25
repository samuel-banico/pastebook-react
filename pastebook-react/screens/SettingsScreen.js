import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { useRoute } from '@react-navigation/native'

import Settings from '../component/settings/Settings'

const SettingsScreen = ({navigation}) => {
  const route = useRoute();
  const { data } = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
        <Settings navigation={navigation} data={data}/>
    </SafeAreaView>
  )
}

export default SettingsScreen