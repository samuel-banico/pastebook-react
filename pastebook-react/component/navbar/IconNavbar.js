import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

const IconNavbar = ({page, currPage}) => {

  return (
    <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => page('Home')}>
            {
              currPage === 'Home' ? <Ionicons name='home' size={25}/> : <Ionicons name='home-outline' size={25}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => page('FriendRequest')}>
            {
              currPage === 'FriendRequest' ? <Ionicons name='person-add' size={25}/> : <Ionicons name='person-add-outline' size={25}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => page('Notification')}>
            {
              currPage === 'Notification' ? <Ionicons name='notifications' size={25}/> : <Ionicons name='notifications-outline' size={25}/>
            }
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