import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Security = ({navigation}) => {
  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Security')}>
            <Text>Security</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Security