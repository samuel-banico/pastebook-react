import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Header = ({navigation}) => {
  return (
    <View style={[styles.logoContainer]}>
        <TouchableOpacity>
          <Image 
          style={styles.logo} 
          source={require('../../assets/img/logo.png')}/>
        </TouchableOpacity>

        <View style={styles.iconsLogoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MaterialIcons name='search' size={25} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons name='settings' size={25} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsLogoContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: 20,
  }
})

export default Header