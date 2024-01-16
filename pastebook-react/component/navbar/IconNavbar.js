import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const IconNavbar = ({page}) => {
  return (
    <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => page('Home')}>
            <MaterialIcons name='home' size={25}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => page('FriendRequest')}>
            <MaterialIcons name='group-add' size={25}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => page('Notification')}>
            <MaterialIcons name='notifications' size={25}/>
          </TouchableOpacity>
        </View>
  )
}

export default IconNavbar

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 5
      },
})