import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import { getTokenData } from '../others/LocalStorage'

import { getNavbarRequest } from './NavbarService'

const IconNavbar = ({page, currPage}) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const token = await getTokenData();
      await getNavbarRequest(token)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    };
  
    fetchData();
  },[])

  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => page('Home')}>
        {
          currPage === 'Home' ? <Ionicons name='home' size={25}/> : <Ionicons name='home-outline' size={25}/>
        }
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => page('FriendRequest')}>
          {
            currPage === 'FriendRequest' ? <Ionicons name='person-add' size={25}/> : <Ionicons name='person-add-outline' size={25}/>
          }
        </TouchableOpacity>
        {
          data.hasFriendRequest && <Image style={styles.img} source={require('../../assets/img/indication.png')} />
        }
      </View>
      <View>
        <TouchableOpacity onPress={() => page('Notification')}>
          {
            currPage === 'Notification' ? <Ionicons name='notifications' size={25}/> : <Ionicons name='notifications-outline' size={25}/>
          }
        </TouchableOpacity>
        {
          data.hasNotification && <Image style={styles.img} source={require('../../assets/img/indication.png')} />
        }
      </View>
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

    img : {
      width: 10,
      height: 10,
      position: 'absolute',
      left: 20
    }
})